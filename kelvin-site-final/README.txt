# Notes I’d want you to see before the thermometer reads 0 Kelvin

## Files

- `index.html` — page structure and introductory letter
- `style.css` — black-and-white visual design
- `script.js` — notes, interactions, media and per-note section controls
- `images/note-01/` through `images/note-10/` — photograph folders

## Per-note section controls

Every note has:

```js
sections: {
  poem: false,
  morePhotos: false,
  song: false,
  youtube: false
}
```

Set any value to `true` to show it in the expanded note.

If it is `false`, that section is completely omitted.

This means every note can have a different structure without changing HTML or CSS.

## Photographs

The first photograph is the main image.

Example:

```js
photos: [
  "images/note-01/photo-01.jpg",
  "images/note-01/photo-02.jpg"
]
```

Additional photographs are displayed only when `morePhotos: true`.

## Poems

Set `poem: true` and add the poem:

```js
poem: "Your poem here..."
```

## Songs

Set `song: true` and add:

```js
song: {
  title: "Song name",
  artist: "Artist",
  url: "https://..."
}
```

The current button opens the supplied song link in a new tab.

## YouTube

Set `youtube: true`.

You can paste:

```text
https://www.youtube.com/watch?v=VIDEO_ID
https://youtu.be/VIDEO_ID
https://www.youtube.com/shorts/VIDEO_ID
https://www.youtube.com/embed/VIDEO_ID
```

The JavaScript automatically converts supported URLs into YouTube embed URLs.

### Local testing and YouTube Error 153

If YouTube gives Error 153 when opening `index.html` directly, use a local server instead.

From this folder run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Normal workflow

For almost everything you will do later, edit only `script.js` and put media in the appropriate `images/note-XX/` folder.
