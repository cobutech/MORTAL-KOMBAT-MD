Iconst { xforcemd } = require("../framework/xforcemd"); // Changed 'zokou' to 'xforcemd'
var mumaker = require("mumaker");

xforcemd(
  {
    nomCom: "hacker",
    categorie: "Logo",
    reaction: "👨🏿‍💻"
  },
  async (origineMessage, zk, commandeOptions) => {
    const { prefixe, arg, ms, repondre } = commandeOptions;
    if (!arg || arg == "") {
      repondre("*__Example: * " + prefixe + "hacker xforcemd"); // Translated into English
      return;
    }
    try {
      let anu = await mumaker.ephoto(
        "https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html",
        arg
      );
      repondre("* Processing in progress... *"); // Translated into English
      await zk.sendMessage(
        origineMessage,
        { image: { url: anu.image }, caption: "* \t Logo by xforcemd*" }, // Changed to 'xforcemd'
        { quoted: ms }
      );
    } catch (e) {
      repondre("🥵🥵 " + e);
    }
  }
);

xforcemd(
  {
    nomCom: "dragonball",
    categorie: "Logo",
    reaction: "🐉"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, repondre, prefixe, ms } = commandeOptions;
    try {
      const noArgMsg = `*_Example: * ${prefixe}dragonball YourText`; // Translated into English
      if (!arg || arg == "") {
        repondre(noArgMsg);
        return;
      }
      var lienMaker2 =
        "https://en.ephoto360.com/create-dragon-ball-style-text-effects-online-809.html";

      const imgInfo = await mumaker.ephoto(lienMaker2, arg.join(" "));
      await zk.sendMessage(
        dest,
        { text: " *Processing in progress...*" }, // Translated into English
        { quoted: ms }
      );
      await zk.sendMessage(
        dest,
        { image: { url: imgInfo.image }, caption: "* \t Logo by xforcemd*" }, // Changed to 'xforcemd'
        { quoted: ms }
      );
    } catch (e) {
      repondre("🥵🥵 " + e);
    }
  }
);

xforcemd(
  {
    nomCom: "naruto",
    categorie: "Logo",
    reaction: "⛩"
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre, prefixe } = commandeOptions;
    try {
      if (!arg || arg == "") {
        repondre("*_Example: * " + prefixe + "naruto xforcemd"); // Translated into English and changed to 'xforcemd'
        return;
      }
      var img = await mumaker.ephoto(
        "https://en.ephoto360.com/naruto-shippuden-logo-style-text-effect-online-808.html",
        arg.join(" ")
      );

      repondre("*Processing in progress...*"); // Translated into English
      await zk.sendMessage(
        dest,
        { image: { url: img.image }, caption: "\t\t *Logo by xforcemd*" }, // Changed to 'xforcemd'
        { quoted: ms }
      );
    } catch (e) {
      repondre("🥵🥵 " + e);
    }
  }
);
    xforcemd(
  {
    nomCom: "didong",
    categorie: "Logo",
    reaction: "📱"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, repondre, prefixe, ms } = commandeOptions;
    try {
      var titre = "\t* logo by xforcemd*"; // Changed to 'xforcemd'
      var lien =
        "https://ephoto360.com/tao-anh-che-vui-tu-choi-cuoc-goi-voi-ten-cua-ban-930.html";
      if (!arg || arg == "") {
        repondre(`*Example: * ${prefixe}didong xforcemd`); // Translated to English and changed to 'xforcemd'
        return;
      }

      var maker = await mumaker.ephoto(lien, arg.join(" "));

      repondre("Processing in progress..."); // Translated into English
      await zk.sendMessage(
        dest,
        { image: { url: maker.image }, caption: titre }, // Changed to 'xforcemd'
        { quoted: ms }
      );
    } catch (e) {
      repondre("🥵🥵 " + e);
    }
  }
);

xforcemd(
  {
    nomCom: "wall",
    categorie: "Logo",
    reaction: "👍"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg[0]) {
      repondre(`Here’s how to use the command:\n ${prefixe}wall xforcemd`); // Translated to English and changed to 'xforcemd'
      return;
    }
    let text = arg.join(" ");
    mumaker
      .textpro(
        "https://textpro.me/break-wall-text-effect-871.html",
        text
      )
      .then((data) => {
        zk.sendMessage(
          dest,
          { image: { url: data.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
          { quoted: ms }
        );
      })
      .catch(console.log);
  }
);

xforcemd(
  {
    nomCom: "summer",
    categorie: "Logo",
    reaction: "🌞"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg[0]) {
      repondre(`Here’s how to use the command:\n ${prefixe}summer YourText`); // Translated to English
      return;
    }

    const text = arg.join(" ");
    mumaker
      .textpro(
        "https://textpro.me/create-sunset-light-text-effects-online-for-free-1124.html",
        text
      )
      .then((data) => {
        zk.sendMessage(
          dest,
          { image: { url: data.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
          { quoted: ms }
        );
      })
      .catch(console.error);
  }
);

xforcemd(
  {
    nomCom: "neonlight",
    categorie: "Logo",
    reaction: "💡"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
      repondre(`Here’s how to use the command:\n ${prefixe}neonlight YourText`); // Translated to English
      return;
    }

    const text = arg.join(" ");
    try {
      let maker = await mumaker.textpro(
        "https://textpro.me/create-glowing-neon-light-text-effect-online-free-1061.html",
        text
      );
      zk.sendMessage(
        dest,
        { image: { url: maker.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
        { quoted: ms }
      );
    } catch (e) {
      repondre("🥵🥵 " + e);
    }
  }
);
      xforcemd(
  {
    nomCom: "greenneon",
    categorie: "Logo",
    reaction: "🟢"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg[0]) {
      repondre(`Here’s how to use the command:\n ${prefixe}greenneon YourText`); // Translated to English
      return;
    }

    const text = arg.join(" ");
    mumaker
      .textpro("https://textpro.me/green-neon-text-effect-874.html", text)
      .then((data) => {
        zk.sendMessage(
          dest,
          { image: { url: data.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
          { quoted: ms }
        );
      })
      .catch(console.error);
  }
);

xforcemd(
  {
    nomCom: "glitch",
    categorie: "Logo",
    reaction: "🎛️"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg[0]) {
      repondre(`Here’s how to use the command:\n ${prefixe}glitch YourText`); // Translated to English
      return;
    }

    const text = arg.join(" ");
    mumaker
      .textpro(
        "https://textpro.me/create-impressive-glitch-text-effects-online-1027.html",
        text
      )
      .then((data) => {
        zk.sendMessage(
          dest,
          { image: { url: data.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
          { quoted: ms }
        );
      })
      .catch(console.error);
  }
);

xforcemd(
  {
    nomCom: "devil",
    categorie: "Logo",
    reaction: "😈"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg[0]) {
      repondre(`Here’s how to use the command:\n ${prefixe}devil YourText`); // Translated to English
      return;
    }

    const text = arg.join(" ");
    mumaker
      .textpro(
        "https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html",
        text
      )
      .then((data) => {
        zk.sendMessage(
          dest,
          { image: { url: data.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
          { quoted: ms }
        );
      })
      .catch(console.error);
  }
);

xforcemd(
  {
    nomCom: "boom",
    categorie: "Logo",
    reaction: "💥"
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefixe, arg } = commandeOptions;
    if (!arg || arg == "") {
      repondre(`Example: ${prefixe}boom xforcemd`); // Translated to English and changed to 'xforcemd'
      return;
    }
    try {
      var lien =
        "https://en.ephoto360.com/boom-text-comic-style-text-effect-675.html";
      var img = await mumaker.ephoto(lien, arg);

      repondre("Processing in progress..."); // Translated to English
      await zk.sendMessage(
        dest,
        { image: { url: img.image }, caption: "*Logo by xforcemd*" }, // Changed to 'xforcemd'
        { quoted: ms }
      );
    } catch (e) {
      repondre("🥵🥵 " + e);
    }
  }
);

xforcemd(
  {
    nomCom: "water",
    categorie: "Logo",
    reaction: "💦"
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, prefixe } = commandeOptions;
    if (!arg || arg == "") {
      repondre(`${prefixe}water xforcemd`); // Changed to 'xforcemd'
      return;
    }
    try {
      var lien = "https://en.ephoto360.com/create-water-effect-text-online-295.html";
      var img = await mumaker.ephoto(lien, arg);
      repondre("Processing in progress..."); // Translated to English
      await zk.sendMessage(
        dest,
        { image: { url: img.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
        { quoted: ms }
      );
    } catch (e) {
      repondre(`🥵🥵 ${e}`);
    }
  }
);
    xforcemd(
  {
    nomCom: "snow",
    categorie: "Logo",
    reaction: "❄️"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, ms, prefixe, repondre } = commandeOptions;
    if (!arg[0]) {
      repondre(`Here’s how to use the command:\n ${prefixe}snow YourText`); // Translated to English
      return;
    }

    const text = arg.join(" ");
    mumaker
      .textpro(
        "https://textpro.me/create-beautiful-3d-snow-text-effect-online-1101.html",
        text
      )
      .then((data) => {
        zk.sendMessage(
          dest,
          { image: { url: data.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
          { quoted: ms }
        );
      })
      .catch((err) => {
        console.error("An error occurred:", err); // Translated to English
      });
  }
);

xforcemd(
  {
    nomCom: "transformer",
    categorie: "Logo",
    reaction: "🤖"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, ms, prefixe, repondre } = commandeOptions;
    if (!arg[0]) {
      repondre(`Here’s how to use the command:\n ${prefixe}transformer YourText`); // Translated to English
      return;
    }

    const text = arg.join(" ");
    mumaker
      .textpro(
        "https://textpro.me/create-a-transformer-text-effect-online-1035.html",
        text
      )
      .then((data) => {
        zk.sendMessage(
          dest,
          { image: { url: data.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
          { quoted: ms }
        );
      })
      .catch((err) => {
        console.error("An error occurred:", err); // Translated to English
      });
  }
);

xforcemd(
  {
    nomCom: "thunder",
    categorie: "Logo",
    reaction: "⚡"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, ms, prefixe, repondre } = commandeOptions;
    if (!arg[0]) {
      repondre(`Here’s how to use the command:\n ${prefixe}thunder YourText`); // Translated to English
      return;
    }

    const text = arg.join(" ");
    mumaker
      .textpro(
        "https://textpro.me/online-thunder-text-effect-generator-1031.html",
        text
      )
      .then((data) => {
        zk.sendMessage(
          dest,
          { image: { url: data.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
          { quoted: ms }
        );
      })
      .catch((err) => {
        console.error("An error occurred:", err); // Translated to English
      });
  }
);

xforcemd(
  {
    nomCom: "harrypotter",
    categorie: "Logo",
    reaction: "🧙‍♂️"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, ms, prefixe, repondre } = commandeOptions;
    if (!arg[0]) {
      repondre(`Here’s how to use the command:\n ${prefixe}harrypotter YourText`); // Translated to English
      return;
    }

    const text = arg.join(" ");
    mumaker
      .textpro(
        "https://textpro.me/create-harry-potter-text-effect-online-1025.html",
        text
      )
      .then((data) => {
        zk.sendMessage(
          dest,
          { image: { url: data.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
          { quoted: ms }
        );
      })
      .catch((err) => {
        console.error("An error occurred:", err); // Translated to English
      });
  }
);

xforcemd(
  {
    nomCom: "cat",
    categorie: "Logo",
    reaction: "🪟"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, ms, prefixe, repondre } = commandeOptions;
    if (!arg[0]) {
      repondre(`Here’s how to use the command:\n ${prefixe}foggywindow YourText`); // Translated to English
      return;
    }

    const text = arg.join(" ");
    mumaker
      .textpro(
        "https://textpro.me/write-text-on-foggy-window-online-free-1015.html",
        text
      )
      .then((data) => {
        zk.sendMessage(
          dest,
          { image: { url: data.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
          { quoted: ms }
        );
      })
      .catch((err) => {
        console.error("An error occurred:", err); // Translated to English
      });
  }
);
  xforcemd(
  {
    nomCom: "whitegold",
    categorie: "Logo",
    reaction: "💫"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, ms, prefixe, repondre } = commandeOptions;
    if (!arg[0]) {
      repondre(`Here’s how to use the command:\n ${prefixe}whitegold YourText`); // Translated to English
      return;
    }

    const text = arg.join(" ");
    mumaker
      .textpro(
        "https://textpro.me/elegant-white-gold-3d-text-effect-online-free-1070.html",
        text
      )
      .then((data) => {
        zk.sendMessage(
          dest,
          { image: { url: data.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
          { quoted: ms }
        );
      })
      .catch((err) => {
        console.error("An error occurred:", err); // Translated to English
      });
  }
);

xforcemd(
  {
    nomCom: "lightglow",
    categorie: "Logo",
    reaction: "🌟"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, ms, prefixe, repondre } = commandeOptions;
    if (!arg[0]) {
      repondre(`Here’s how to use the command:\n ${prefixe}lightglow YourText`); // Translated to English
      return;
    }

    const text = arg.join(" ");
    mumaker
      .textpro(
        "https://textpro.me/create-light-glow-sliced-text-effect-online-1068.html",
        text
      )
      .then((data) => {
        zk.sendMessage(
          dest,
          { image: { url: data.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
          { quoted: ms }
        );
      })
      .catch((err) => {
        console.error("An error occurred:", err); // Translated to English
      });
  }
);

xforcemd(
  {
    nomCom: "thor",
    categorie: "Logo",
    reaction: "🔨"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, ms, prefixe, repondre } = commandeOptions;
    if (!arg[0]) {
      repondre(`Here’s how to use the command:\n ${prefixe}thor YourText`); // Translated to English
      return;
    }

    const text = arg.join(" ");
    mumaker
      .textpro(
        "https://textpro.me/create-thor-logo-style-text-effect-online-1064.html",
        text
      )
      .then((data) => {
        zk.sendMessage(
          dest,
          { image: { url: data.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
          { quoted: ms }
        );
      })
      .catch((err) => {
        console.error("An error occurred:", err); // Translated to English
      });
  }
);

xforcemd(
  {
    nomCom: "neon",
    categorie: "Logo",
    reaction: "💡"
  },
  async (dest, zk, commandeOptions) => {
    const { arg, ms, prefixe, repondre } = commandeOptions;
    if (!arg[0]) {
      repondre(`Here’s how to use the command:\n ${prefixe}neon YourText`); // Translated to English
      return;
    }

    const text = arg.join(" ");
    mumaker
      .textpro("https://textpro.me/neon-text-effect-online-879.html", text)
      .then((data) => {
        zk.sendMessage(
          dest,
          { image: { url: data.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
          { quoted: ms }
        );
      })
      .catch((err) => {
        console.error("An error occurred:", err); // Translated to English
      });
  }
);

xforcemd(
  {
    nomCom: "purple",
    categorie: "Logo",
    reaction: "🧳"
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefixe, arg } = commandeOptions;
    if (!arg || arg == "") {
      repondre(prefixe + "purple xforcemd"); // Changed to 'xforcemd'
      return;
    }

    try {
      const lien = "https://en.ephoto360.com/purple-text-effect-online-100.html";
      var img = await mumaker.ephoto(lien, arg);
      repondre("Processing in progress..."); // Translated to English
      await zk.sendMessage(
        dest,
        { image: { url: img.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
        { quoted: ms }
      );
    } catch (e) {
      repondre(e);
    }
  }
);

xforcemd(
  {
    nomCom: "gold",
    categorie: "Logo",
    reaction: "🧚🏿‍♀️"
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, prefixe, repondre } = commandeOptions;
    if (!arg || arg == "") {
      repondre(prefixe + "gold xforcemd"); // Changed to 'xforcemd'
      return;
    }

    try {
      const lien = "https://en.ephoto360.com/modern-gold-4-213.html";
      var img = await mumaker.ephoto(lien, arg);
      repondre("Processing in progress..."); // Translated to English
      await zk.sendMessage(
        dest,
        { image: { url: img.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
        { quoted: ms }
      );
    } catch (e) {
      repondre(e);
    }
  }
);

xforcemd(
  {
    nomCom: "arena",
    categorie: "Logo",
    reaction: "🥵"
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, prefixe, repondre } = commandeOptions;
    if (!arg || arg == "") {
      repondre(prefixe + "arena xforcemd"); // Changed to 'xforcemd'
      return;
    }

    try {
      const lien =
        "https://en.ephoto360.com/create-cover-arena-of-valor-by-mastering-360.html";
      var img = await mumaker.ephoto(lien, arg.join(" "));
      repondre("Processing in progress..."); // Translated to English
      await zk.sendMessage(
        dest,
        { image: { url: img.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
        { quoted: ms }
      );
    } catch (e) {
      repondre(e);
    }
  }
);

xforcemd(
  {
    nomCom: "incandescent",
    categorie: "Logo",
    reaction: "😋"
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, prefixe, repondre } = commandeOptions;
    if (!arg || arg == "") {
      repondre(prefixe + "incandescent xforcemd"); // Changed to 'xforcemd'
      return;
    }

    try {
      const lien =
        "https://en.ephoto360.com/text-effects-incandescent-bulbs-219.html";
      var img = await mumaker.ephoto(lien, arg.join(" "));
      repondre("Processing in progress..."); // Translated to English
      await zk.sendMessage(
        dest,
        { image: { url: img.image }, caption: "Logo created by xforcemd" }, // Changed to 'xforcemd'
        { quoted: ms }
      );
    } catch (e) {
      repondre(e);
    }
  }
);
  xforcemd(
  {
    nomCom: "firetext", // Command name
    categorie: "Logo",  // Category
    reaction: "🔥"      // Reaction emoji
  },
  async (dest, zk, commandeOptions) => {
    const { arg, ms, prefixe, repondre } = commandeOptions;

    // Checking if the user provided the text for the logo
    if (!arg || arg.length === 0) {
      repondre(`Here’s how to use the command:\n ${prefixe}firetext YourText`); // Instruction if no text is provided
      return;
    }

    const text = arg.join(" ");

    try {
      // Using mumaker to apply a fire text effect
      const logoURL = "https://en.ephoto360.com/create-3d-fire-text-effects-online-723.html"; // Link for fire text effect
      const imageResult = await mumaker.ephoto(logoURL, text);

      // Sending the result back to the user
      await zk.sendMessage(
        dest,
        { image: { url: imageResult.image }, caption: "🔥 Logo created by xforcemd 🔥" }, // Custom caption with fire emoji
        { quoted: ms }
      );
    } catch (error) {
      repondre(`An error occurred while generating the logo: ${error}`);
    }
  }
);

xforcemd(
  {
    nomCom: "marvel", // Command name
    categorie: "Logo",  // Category
    reaction: "🦸‍♂️"      // Reaction emoji
  },
  async (dest, zk, commandeOptions) => {
    const { arg, ms, prefixe, repondre } = commandeOptions;

    // Check if the user provided text
    if (!arg || arg.length === 0) {
      repondre(`Here’s how to use the command:\n ${prefixe}marvel YourText`); // Instruction if no text is provided
      return;
    }

    const text = arg.join(" ");

    try {
      // Link for Marvel text effect
      const marvelLogoURL = "https://en.ephoto360.com/marvel-style-logo-1059.html";
      const imageResult = await mumaker.ephoto(marvelLogoURL, text);

      // Send the generated Marvel logo back to the user
      await zk.sendMessage(
        dest,
        { image: { url: imageResult.image }, caption: "🦸‍♂️ Marvel logo created by xforcemd" }, // Custom caption with superhero emoji
        { quoted: ms }
      );
    } catch (error) {
      repondre(`An error occurred while generating the Marvel logo: ${error}`);
    }
  }
);

xforcemd(
  {
    nomCom: "pencil", // Command name
    categorie: "Logo",  // Category
    reaction: "✏️"      // Reaction emoji
  },
  async (dest, zk, commandeOptions) => {
    const { arg, ms, prefixe, repondre } = commandeOptions;

    // Check if the user provided text
    if (!arg || arg.length === 0) {
      repondre(`Here’s how to use the command:\n ${prefixe}pencil YourText`); // Instruction if no text is provided
      return;
    }

    const text = arg.join(" ");

    try {
      // Link for pencil text effect
      const pencilLogoURL = "https://en.ephoto360.com/create-pencil-drawing-text-effect-online-1047.html";
      const imageResult = await mumaker.ephoto(pencilLogoURL, text);

      // Send the generated pencil logo back to the user
      await zk.sendMessage(
        dest,
        { image: { url: imageResult.image }, caption: "✏️ Pencil logo created by xforcemd" }, // Custom caption with pencil emoji
        { quoted: ms }
      );
    } catch (error) {
      repondre(`An error occurred while generating the pencil logo: ${error}`);
    }
  }
);

xforcemd({ nomCom: "fire", categorie: "Logo", reaction: "🔥" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}fire MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-a-fiery-text-effect-online-free-1085.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Fire Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "ice", categorie: "Logo", reaction: "❄️" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}ice MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/ice-cold-text-effect-849.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Ice Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "metal", categorie: "Logo", reaction: "🔩" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}metal MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/metallic-text-effect-842.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Metal Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "retro", categorie: "Logo", reaction: "🎮" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}retro MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/80-s-retro-neon-text-effect-online-979.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Retro Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "matrix", categorie: "Logo", reaction: "🟢" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}matrix MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/matrix-style-text-effect-online-884.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Matrix Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "magma", categorie: "Logo", reaction: "🌋" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}magma MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Magma Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "demon", categorie: "Logo", reaction: "👹" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}demon MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Demon Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "orange", categorie: "Logo", reaction: "🍊" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}orange MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-an-orange-juice-text-effect-1009.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Orange Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "leaves", categorie: "Logo", reaction: "🍂" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}leaves MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-leaves-fall-text-effect-online-991.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Leaves Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});


xforcemd({ nomCom: "joker", categorie: "Logo", reaction: "🃏" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}joker MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-logo-joker-online-934.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Joker Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "graffiti", categorie: "Logo", reaction: "🎨" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}graffiti MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-a-cool-graffiti-text-on-the-wall-1004.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Graffiti Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "lava", categorie: "Logo", reaction: "🌋" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}lava MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/lava-text-effect-online-914.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Lava Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "smoke", categorie: "Logo", reaction: "💨" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}smoke MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-smoke-text-effect-online-free-1029.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Smoke Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "rainbow", categorie: "Logo", reaction: "🌈" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}rainbow MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-a-rainbow-text-effect-online-973.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Rainbow Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "chocolate", categorie: "Logo", reaction: "🍫" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}chocolate MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/chocolate-cake-text-effect-890.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Chocolate Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});


xforcemd({ nomCom: "blood", categorie: "Logo", reaction: "🩸" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}blood MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/horror-blood-text-effect-online-883.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Blood Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "neon", categorie: "Logo", reaction: "💡" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}neon MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/neon-text-effect-online-879.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Neon Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "wood", categorie: "Logo", reaction: "🌳" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}wood MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/wood-text-effect-free-online-973.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Wood Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "glitch", categorie: "Logo", reaction: "🎛️" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}glitch MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Glitch Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "horror", categorie: "Logo", reaction: "👻" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}horror MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-a-scary-halloween-text-effect-online-1048.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Horror Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "galaxy", categorie: "Logo", reaction: "🌌" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}galaxy MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-galaxy-style-free-text-effect-online-1055.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Galaxy Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "firework", categorie: "Logo", reaction: "🎆" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}firework MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/firework-sparkle-text-effect-930.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Firework Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "candy", categorie: "Logo", reaction: "🍬" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}candy MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/sweet-candy-text-effect-868.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Candy Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "stone", categorie: "Logo", reaction: "🪨" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}stone MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Stone Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "thunder", categorie: "Logo", reaction: "⚡" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}thunder MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/online-thunder-text-effect-generator-1031.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Thunder Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "3d", categorie: "Logo", reaction: "📐" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}3d MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/3d-box-text-effect-online-880.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*3D Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "bubble", categorie: "Logo", reaction: "🫧" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}bubble MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/bubble-text-effect-829.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Bubble Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});
  
xforcemd({ nomCom: "sketch", categorie: "Logo", reaction: "🖊️" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}sketch MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-a-sketch-text-effect-online-1044.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Sketch Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "watercolor", categorie: "Logo", reaction: "🎨" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}watercolor MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-watercolor-text-effect-online-704.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Watercolor Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "sand", categorie: "Logo", reaction: "🏖️" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}sand MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/sand-text-effect-online-998.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Sand Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "moon", categorie: "Logo", reaction: "🌕" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}moon MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/moon-text-effect-online-1024.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Moon Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "glitter", categorie: "Logo", reaction: "✨" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}glitter MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/glitter-text-effect-online-839.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Glitter Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "space", categorie: "Logo", reaction: "🚀" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}space MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/space-text-effect-online-945.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Space Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "circuit", categorie: "Logo", reaction: "💻" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}circuit MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-blue-circuit-style-text-effect-online-1043.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Circuit Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "ink", categorie: "Logo", reaction: "🖋️" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}ink MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-3d-black-and-white-ink-splash-text-effect-online-994.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Ink Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "8bit", categorie: "Logo", reaction: "🕹️" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}8bit MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/video-game-classic-8-bit-text-effect-1037.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*8bit Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "ice", categorie: "Logo", reaction: "❄️" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}ice MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/ice-cold-text-effect-849.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Ice Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "cloud", categorie: "Logo", reaction: "☁️" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}cloud MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/create-cloud-text-effect-online-free-1061.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Cloud Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});

xforcemd({ nomCom: "lightning", categorie: "Logo", reaction: "⚡" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, ms, prefixe } = commandeOptions;
    if (!arg || arg == "") {
        repondre(`Example: ${prefixe}lightning MyText`);
        return;
    }

    const text = arg.join(" ");
    try {
        const maker = await mumaker.textpro("https://textpro.me/thunder-text-effect-online-881.html", text);
        await zk.sendMessage(dest, { image: { url: maker.image }, caption: '*Lightning Logo created by xforcemd*' }, { quoted: ms });
    } catch (e) {
        repondre(`🥵 Error: ${e}`);
    }
});
          
          
      
