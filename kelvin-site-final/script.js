/*
  NOTES ARCHITECTURE

  Each note independently controls whether these optional sections appear:
    poem
    morePhotos
    song
    youtube

  Example:
    sections: {
      poem: true,
      morePhotos: false,
      song: true,
      youtube: false
    }

  YouTube accepts normal watch URLs, youtu.be URLs, Shorts URLs,
  and embed URLs. They are converted automatically.
*/

const notes = [
  {
    text: "i’d recognise you without eyebrows",
    sections: { poem: false, morePhotos: false, song: false, youtube: true },
    photos: ["images/note-01/note 1.jpeg"],
    poem: "",
    song: { title: "", artist: "", url: "" },
    youtube: "https://www.youtube.com/watch?v=nusqSsXRwVs"
  },
  {
    text: "i see you rub your face like a cat when you wake up and my heart explodes",
    sections: { poem: false, morePhotos: false, song: false, youtube: false },
    photos: ["images/note-02/note 2.jpeg"],
    poem: "",
    song: { title: "", artist: "", url: "" },
    youtube: ""
  },
  {
    text: "the love i have for you makes me wear down the history of porcelain into footnotes to tell you i love you",
    sections: { poem: false, morePhotos: false, song: false, youtube: false },
    photos: ["images/note-03/note 3.jpeg"],
    poem: "",
    song: { title: "", artist: "", url: "" },
    youtube: ""
  },
  {
    text: "the way your nose expands when you lie is how mine does when i make a poopy face",
    sections: { poem: false, morePhotos: false, song: false, youtube: false },
    photos: ["images/note-04/note 4.jpeg"],
    poem: "",
    song: { title: "", artist: "", url: "" },
    youtube: ""
  },
  {
    text: "you could blow 6 billion cigarette puffs my way and i’d still have enough oxygen in my lungs to hold my breath before i kiss you",
    sections: { poem: false, morePhotos: false, song: false, youtube: true },
    photos: ["images/note-05/note 5.jpeg"],
    poem: "",
    song: { title: "", artist: "", url: "" },
    youtube: "https://www.youtube.com/watch?v=HjuP527Xt2Q&t=657s"
  },
  {
    text: "i want nothing more to have a beer with you right this instant. I’m going to make a ring out of pop tabs from beer cans for you",
    sections: { poem: false, morePhotos: false, song: false, youtube: false },
    photos: ["images/note-06/note 6.jpeg"],
    poem: "",
    song: { title: "", artist: "", url: "" },
    youtube: ""
  },
  {
    text: "in an alternate universe I'm sure we're academics studying something like how linguistics powers sex or how time meets us at the end of the anthropological tunnel. I hope I'm the salt in your eggs in that and every other reality ",
    sections: { poem: false, morePhotos: false, song: false, youtube: false },
    photos: ["images/note-07/note 7.jpeg"],
    poem: "",
    song: { title: "", artist: "", url: "" },
    youtube: ""
  },
  {
    text: "new running goal is to go 741 kms and back in under 2 seconds. Getting hit by CW flash’s lightning bolt would be mad convenient rn",
    sections: { poem: false, morePhotos: false, song: false, youtube: false },
    photos: ["images/note-08/note 8.jpeg"],
    poem: "",
    song: { title: "", artist: "", url: "" },
    youtube: ""
  },
  {
    text: "you should know that i’m already plotting and scheming to get max and your mom to fw me more than they fw you. ^ pfa me plotting and scheming",
    sections: { poem: false, morePhotos: false, song: false, youtube: false },
    photos: ["images/note-09/note 9.jpeg"],
    poem: "",
    song: { title: "", artist: "", url: "" },
    youtube: ""
  },
  {
    text: "i haven’t done a murdle without you around and i never plan to. my braincells just dont love me enough to run as fast without you around. I think they have a little crush on you.",
    sections: { poem: false, morePhotos: false, song: false, youtube: false },
    photos: ["images/note-10/note 10.jpeg"],
    poem: "",
    song: { title: "", artist: "", url: "" },
    youtube: ""
  }
];

const notesContainer = document.querySelector("#notes");
const modal = document.querySelector("#note-modal");
const expandedContent = document.querySelector("#expanded-content");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getYouTubeEmbedUrl(url) {
  if (!url || !url.trim()) return "";

  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : "";
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        const id = parsed.searchParams.get("v");
        return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : "";
      }

      if (parsed.pathname.startsWith("/shorts/") || parsed.pathname.startsWith("/embed/")) {
        const id = parsed.pathname.split("/")[2];
        return id ? `https://www.youtube.com/embed/${encodeURIComponent(id)}` : "";
      }
    }
  } catch (_) {}

  return "";
}

function getCover(note, expanded = false) {
  const className = expanded ? "expanded-photo" : "note-cover";

  if (note.photos?.length) {
    return `<div class="${className}">
      <img src="${escapeHtml(note.photos[0])}" alt="">
    </div>`;
  }

  return `<div class="${className}">
    <span class="placeholder">photograph${expanded ? " placeholder" : ""}</span>
  </div>`;
}

function renderNotes() {
  notesContainer.innerHTML = notes.map((note, index) => `
    <div class="note-wrap">
      <button class="note" type="button" data-index="${index}">
        ${getCover(note)}
        <div class="note-copy">${escapeHtml(note.text)}</div>
      </button>
    </div>
  `).join("");

  notesContainer.querySelectorAll(".note").forEach(button => {
    button.addEventListener("click", () => openNote(Number(button.dataset.index)));
  });
}

function renderPoem(note) {
  if (!note.sections.poem) return "";

  return `<section class="section">
    <p class="section-label">poem</p>
    ${note.poem?.trim()
      ? `<div class="poem">${escapeHtml(note.poem)}</div>`
      : `<div class="media-placeholder">your poem will go here</div>`}
  </section>`;
}

function renderMorePhotos(note) {
  if (!note.sections.morePhotos) return "";

  const photos = note.photos?.slice(1) || [];

  return `<section class="section">
    <p class="section-label">more photographs</p>
    ${photos.length
      ? `<div class="media-grid">${photos.map(src => `<img src="${escapeHtml(src)}" alt="">`).join("")}</div>`
      : `<div class="media-placeholder">additional photographs</div>`}
  </section>`;
}

function renderSong(note) {
  if (!note.sections.song) return "";

  const hasUrl = Boolean(note.song?.url);

  return `<section class="section">
    <p class="section-label">song</p>
    <div class="song">
      <button class="song-button" type="button"
        ${hasUrl ? `data-song-url="${escapeHtml(note.song.url)}"` : "disabled"}
        aria-label="${hasUrl ? "Open song" : "Song not added"}">▶</button>
      <div>
        <div class="song-title">${escapeHtml(note.song?.title || "Song to be added")}</div>
        <div class="song-artist">${escapeHtml(note.song?.artist || "Add a link in script.js")}</div>
      </div>
    </div>
  </section>`;
}

function renderYouTube(note) {
  if (!note.sections.youtube) return "";

  const embedUrl = getYouTubeEmbedUrl(note.youtube);

  return `<section class="section">
    <p class="section-label">video</p>
    ${embedUrl
      ? `<div class="video-frame">
          <iframe
            src="${escapeHtml(embedUrl)}"
            title="YouTube video"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>
        </div>`
      : `<div class="video-placeholder">YouTube video — add a link in script.js</div>`}
  </section>`;
}

function renderExpandedNote(note) {
  expandedContent.innerHTML = `
    ${getCover(note, true)}
    <div class="expanded-body">
      <h2 class="expanded-text" id="expanded-text">${escapeHtml(note.text)}</h2>
      ${renderPoem(note)}
      ${renderMorePhotos(note)}
      ${renderSong(note)}
      ${renderYouTube(note)}
    </div>
  `;

  const songButton = expandedContent.querySelector("[data-song-url]");
  if (songButton) {
    songButton.addEventListener("click", () => {
      window.open(songButton.dataset.songUrl, "_blank", "noopener,noreferrer");
    });
  }
}

function openNote(index) {
  const note = notes[index];
  if (!note) return;

  renderExpandedNote(note);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modal.querySelector(".close-button").focus();
}

function closeNote() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  expandedContent.innerHTML = "";
}

modal.querySelectorAll("[data-close]").forEach(element => {
  element.addEventListener("click", closeNote);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeNote();
  }
});

renderNotes();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".note-wrap").forEach(note => revealObserver.observe(note));
