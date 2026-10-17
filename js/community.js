/*
 * Community gallery
 * -----------------
 * Live mode: posts are stored in Supabase (a free hosted database), so everyone
 * who opens the site sees the same gallery. Set it up with SETUP.md and js/config.js.
 * Device mode: if Supabase isn't configured or can't be reached, posts are kept in
 * this browser's storage instead.
 */
(function () {
  "use strict";

  var SUPABASE_URL = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js";
  var BUCKET = "gallery";
  var cfg = window.REMAKE_CONFIG || {};
  var client = null;

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem("remake:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("remake:" + k, JSON.stringify(v)); return true; } catch (e) { return false; } }
  };

  /* ---------- sample posts (from sample-data.js, labelled "Sample" in the app) ---------- */
  function exampleItems() {
    var samples = (window.REMAKE_SAMPLES && window.REMAKE_SAMPLES.community) || [];
    var ideas = (window.REMAKE_DATA && window.REMAKE_DATA.ideas) || [];
    return samples.map(function (e, i) {
      var idea = ideas.filter(function (x) { return x.id === e.idea_id; })[0];
      return { id: "s-" + i, example: true, name: e.name, caption: e.caption, idea_id: e.idea_id, idea_name: idea ? idea.name : "", material: idea ? idea.material : "", image_url: e.img, likes: e.likes || 0, created_at: e.date + "T12:00:00Z" };
    });
  }

  /* ---------- images ---------- */
  function compress(file, asBlob) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.onload = function () {
        var img = new Image();
        img.onload = function () {
          var max = 900, scale = Math.min(1, max / Math.max(img.width, img.height));
          var c = document.createElement("canvas");
          c.width = Math.round(img.width * scale); c.height = Math.round(img.height * scale);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          if (asBlob) c.toBlob(function (b) { b ? resolve(b) : reject(new Error("blob")); }, "image/jpeg", 0.8);
          else resolve(c.toDataURL("image/jpeg", 0.7));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /* ---------- setup ---------- */
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src; s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  var api = {
    mode: "local",
    lastError: null,
    configured: !!(cfg.supabaseUrl && cfg.supabaseAnonKey),
    ready: null,

    init: function () {
      if (api.ready) return api.ready;
      if (!api.configured) { api.ready = Promise.resolve("local"); return api.ready; }
      api.ready = loadScript(SUPABASE_URL).then(function () {
        client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
        api.mode = "live";
        return "live";
      }).catch(function (e) { api.lastError = e; api.mode = "local"; return "local"; });
      return api.ready;
    },

    localPosts: function () { return store.get("community", []); },

    list: function () {
      return api.init().then(function () {
        if (api.mode !== "live") return api.localPosts();
        return client.from("posts").select("*").order("created_at", { ascending: false }).limit(120)
          .then(function (res) {
            if (res.error) throw res.error;
            api.lastError = null;
            return res.data || [];
          })
          .catch(function (e) { api.lastError = e; return api.localPosts(); });
      });
    },

    examples: exampleItems,

    add: function (post, file) {
      if (api.mode === "live") {
        var path = Date.now() + "-" + Math.random().toString(36).slice(2, 8) + ".jpg";
        return compress(file, true).then(function (blob) {
          return client.storage.from(BUCKET).upload(path, blob, { contentType: "image/jpeg" });
        }).then(function (res) {
          if (res.error) throw res.error;
          var url = client.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
          return client.from("posts").insert({
            name: post.name || null, caption: post.caption, idea_id: post.idea_id || null,
            idea_name: post.idea_name || null, material: post.material || null, image_url: url
          }).select().single();
        }).then(function (res) {
          if (res.error) throw res.error;
          return { post: res.data, live: true };
        });
      }
      return compress(file, false).then(function (dataUrl) {
        var list = api.localPosts();
        var p = { id: "l-" + Date.now(), name: post.name || "", caption: post.caption, idea_id: post.idea_id, idea_name: post.idea_name, material: post.material, image_url: dataUrl, likes: 0, created_at: new Date().toISOString() };
        list.unshift(p);
        list = list.slice(0, 30);
        var ok = store.set("community", list);
        return { post: p, live: false, stored: ok };
      });
    },

    isLiked: function (id) { return store.get("liked", []).indexOf(String(id)) !== -1; },

    like: function (post) {
      if (api.isLiked(post.id)) return Promise.resolve(post.likes);
      var liked = store.get("liked", []); liked.push(String(post.id)); store.set("liked", liked);
      if (post.example) return Promise.resolve(post.likes + 1);
      if (api.mode === "live" && String(post.id).indexOf("l-") !== 0) {
        return client.rpc("like_post", { post_id: post.id }).then(function (res) {
          if (res.error) throw res.error;
          return typeof res.data === "number" ? res.data : post.likes + 1;
        });
      }
      var list = api.localPosts();
      var n = post.likes + 1;
      list.forEach(function (p) { if (p.id === post.id) { p.likes = n; } });
      store.set("community", list);
      return Promise.resolve(n);
    },

    removeLocal: function (id) {
      store.set("community", api.localPosts().filter(function (p) { return p.id !== id; }));
    }
  };

  window.ReMakeCommunity = api;
})();
