const { xforcemd } = require("../framework/xforcemd"); // Changed 'zokou' to 'xforcemd'
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


