# Vehicle photos go here

The app expects one image per vehicle type, named exactly to match
each vehicle's `imageKey` field in the database:

```
jcb.jpg
tractor.jpg
lorry.jpg
excavator.jpg
crane.jpg
bulldozer.jpg
loader.jpg
trailer.jpg
```

## Where to get free, usable photos

Use a royalty-free stock site so there are no licensing issues:

- https://www.pexels.com (search "JCB", "tractor", "crane", "excavator", etc.)
- https://pixabay.com

Download each one, rename it to match the list above, and drop it in
this folder (`frontend/public/images/vehicles/`). JPG or PNG both work.
Landscape orientation (roughly 4:3 or 16:9) looks best since the cards
crop images to fill their box.

## If you add more vehicles later

Any new vehicle's `imageKey` in the database needs a matching image
file here with the same name, or its card will show a broken image.
