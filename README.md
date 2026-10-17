# ReMake: Upcycling Assistant

A web prototype for the group project **"Upcycling Waste Materials into Useful Products"**.

Upload a photo of a waste item or describe it in a sentence. ReMake recognises the material and suggests upcycling ideas with:

- step-by-step instructions and the tools you need
- a cost breakdown, local selling price and profit estimate
- business advice: who buys it, where to sell, how to grow it
- environmental impact: kg of waste diverted and what happens if it is thrown away
- safety warnings
- a **workshop mode** that turns any idea into a lesson plan (teams, waste to collect, budget, schedule)

It runs entirely in the browser. No login or API key is needed. A **community gallery** lets people share photos of what they made; connect a free Supabase database ([SETUP.md](SETUP.md)) so everyone sees the same posts.

## Features

| Feature | What it does |
|---|---|
| Photo recognition | Uses MobileNet (TensorFlow.js) in the browser to guess the item from a photo. The photo never leaves the device. |
| Description reading | Picks up keywords in English and common Hinglish, such as "tayar", "kanch", "kapde" or "botal", and reads the quantity ("5 glass jars"). |
| Manual override | Material chips let the user correct the detected material. |
| Personalised ranking | Ideas are ranked by ease, profit per hour, the user's skill level, and whether there are enough items. Ideas that don't suit the item's condition or size are listed with the reason. |
| Cost and profit | Prices are scaled for a metro city, a city, or a small town. |
| Workshop mode | Enter the number of participants to get teams, waste to collect (with 10% spare), a materials budget and a schedule. |
| My projects | Save ideas and tick "Made it" once built. |
| Impact dashboard | Total waste diverted, products made, estimated profit, and a breakdown by material. |
| Community gallery | Share photos of finished products, like other posts, and filter by material or sort by most liked. Shared by everyone once Supabase is connected; device-only until then. |
| Sample data | 13 sample community posts and 14 sample projects (June–October 2026) fill the gallery and impact dashboard for demos. Every sample is labelled "Sample" and a "Show sample data" switch hides them. Delete `js/sample-data.js` to remove them. |
| Languages | English, Hindi and Punjabi switch in the header. Buttons, labels, messages, material names and idea names are translated; detailed steps stay in English. |

**Materials covered (12):** plastic bottles, old tyres, glass bottles and jars, old clothes, wooden pallets, Tetra Pak cartons, cardboard, newspapers, metal cans, plastic bags and wrappers, CDs and DVDs, and coconut shells. There are **50 ideas** in total.

## Run it

**Option 1:** open `index.html` in a browser. Everything works except photo recognition, which some browsers block for local files.

**Option 2 (recommended):** run a small local server:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Put it online with GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.

## Project structure

```
index.html        Page layout
SETUP.md          How to connect the shared community database
css/style.css     Styles (lavender theme, light and dark, mobile layout)
js/sample-data.js Labelled sample posts and projects for demos
js/config.js      Community database settings (Supabase URL and public key)
js/data.js        Knowledge base: materials, ideas, costs, prices, weights
js/i18n.js        Interface text in English, Hindi and Punjabi
js/community.js   Community gallery: posts, photos, likes (Supabase or device storage)
js/app.js         Detection, ranking, cost/profit maths, workshop planner, projects, impact
```

## How it works

1. **Detect the material.** The description is checked for keywords (strong words like "glass" outweigh weak ones like "bottle"). If there is a photo, MobileNet returns its top five guesses, which are matched to materials. A material the user picks always wins, then the description, then the photo.
2. **Filter ideas.** Each idea lists the sizes and conditions it works with, so a broken bottle won't be suggested for a lamp.
3. **Calculate the numbers.**
   - Cost = sum of extra materials × regional price factor
   - Profit per product = selling price − cost
   - Products possible = quantity ÷ items needed per product
   - Waste diverted = items used × typical weight of one item
4. **Rank ideas.** Score = ease + profit per hour (log scale) + skill-level adjustment + a bonus if there are enough items.

## Adding a new idea or material

Open `js/data.js` and copy an existing idea. Each idea needs a `material`, `difficulty` (1–3), `hours`, `perProduct`, allowed `sizes` and `conditions`, a `materials` list with costs, `tools`, `steps`, a `sell` range, and business and safety notes. The app picks it up automatically.

## Limitations

- Prices and weights are **estimates** for India and vary by city and season.
- MobileNet is a general image model, not trained on waste. It recognises common items like bottles, jars, wheels, clothes and cartons, but can be wrong with blurry or cluttered photos; the description and material chips correct it.
- Saved projects are stored in the browser only.
- Sample posts and projects are illustrative demo data, not real users or measurements.
- The community gallery is device-only until Supabase is connected. Anyone can post, so posts need occasional checking (see SETUP.md).

## Future scope

- A model trained on photos of waste items for more accurate recognition
- User accounts and moderation tools for the community gallery
- Full Hindi and Punjabi translation of every step
- Live local prices, and a map of buyers and collection points
- Link to the industry waste exchange prototype, so businesses can list bulk waste

## Credits

Made for the group project "Upcycling Waste Materials into Useful Products".
Photo recognition: [TensorFlow.js](https://www.tensorflow.org/js) and [MobileNet](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet).
