const { xforcemd } = require('../framework/xforcemd');
const fs = require("fs");
const { exec } = require("child_process");

const filename = `${Math.random().toString(36)}`;

// Command to speed up audio
xforcemd(
    {
        nomCom: 'deep',
        categorie: 'Audio Editor',
    }, async (dest, zk, commandeOptions) => {
        const { ms, repondre, msgRepondu } = commandeOptions;

        if (msgRepondu) {
            if (msgRepondu.audioMessage) {
                try {
                    const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
                    let set = "-af atempo=4/4,asetrate=44500*2/3";
                    let ran = `${filename}.mp3`;

                    exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                        if (err) {
                            fs.unlinkSync(media);
                            return repondre("Error during procedure: " + err.message);
                        }

                        try {
                            let buff1 = fs.readFileSync(ran);
                            zk.sendMessage(dest, { audio: buff1, mimetype: "audio/mpeg" }, { quoted: ms });
                        } catch (fileError) {
                            repondre("Error reading file: " + fileError.message);
                        } finally {
                            fs.unlinkSync(ran);
                            fs.unlinkSync(media);
                        }
                    });

                } catch (downloadError) {
                    repondre("Error downloading audio: " + downloadError.message);
                }
            } else {
                repondre("This command only works with audio messages");
            }
        } else {
            repondre("Please mention an audio");
        }
    }
);

// Command to apply bass effect
xforcemd(
    {
        nomCom: 'bass',
        categorie: 'Audio Editor',
    }, async (dest, zk, commandeOptions) => {
        const { ms, repondre, msgRepondu } = commandeOptions;

        if (msgRepondu) {
            if (msgRepondu.audioMessage) {
                try {
                    const media2 = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
                    let set2 = "-af equalizer=f=18:width_type=o:width=2:g=14";
                    let ran2 = `${filename}.mp3`;

                    exec(`ffmpeg -i ${media2} ${set2} ${ran2}`, (err, stderr, stdout) => {
                        if (err) {
                            fs.unlinkSync(media2);
                            return repondre("Error during procedure: " + err.message);
                        }

                        try {
                            let buff2 = fs.readFileSync(ran2);
                            zk.sendMessage(dest, { audio: buff2, mimetype: "audio/mpeg" }, { quoted: ms });
                        } catch (fileError) {
                            repondre("Error reading file: " + fileError.message);
                        } finally {
                            fs.unlinkSync(ran2);
                            fs.unlinkSync(media2);
                        }
                    });
                } catch (downloadError) {
                    repondre("Error downloading audio: " + downloadError.message);
                }
            } else {
                repondre("This command only works with audio messages");
            }
        } else {
            repondre("Please mention an audio");
        }
    }
);

// Command to reverse audio
xforcemd(
    {
        nomCom: 'reverse',
        categorie: 'Audio Editor',
    }, async (dest, zk, commandeOptions) => {
        const { ms, repondre, msgRepondu } = commandeOptions;

        if (msgRepondu) {
            if (msgRepondu.audioMessage) {
                try {
                    const media3 = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
                    let set3 = '-filter_complex "areverse"';
                    let ran3 = `${filename}.mp3`;

                    exec(`ffmpeg -i ${media3} ${set3} ${ran3}`, (err, stderr, stdout) => {
                        if (err) {
                            fs.unlinkSync(media3);
                            return repondre("Error during procedure: " + err.message);
                        }

                        try {
                            let buff3 = fs.readFileSync(ran3);
                            zk.sendMessage(dest, { audio: buff3, mimetype: "audio/mpeg" }, { quoted: ms });
                        } catch (fileError) {
                            repondre("Error reading file: " + fileError.message);
                        } finally {
                            fs.unlinkSync(ran3);
                            fs.unlinkSync(media3);
                        }
                    });
                } catch (downloadError) {
                    repondre("Error downloading audio: " + downloadError.message);
                }
            } else {
                repondre("This command only works with audio messages");
            }
        } else {
            repondre("Please mention an audio");
        }
    }
);

// Command to slow down audio
xforcemd(
    {
        nomCom: 'slow',
        categorie: 'Audio Editor',
    }, async (dest, zk, commandeOptions) => {
        const { ms, repondre, msgRepondu } = commandeOptions;

        if (msgRepondu) {
            if (msgRepondu.audioMessage) {
                try {
                    const media5 = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
                    let set5 = '-filter:a "atempo=0.8,asetrate=44100"';
                    let ran5 = `${filename}.mp3`;

                    exec(`ffmpeg -i ${media5} ${set5} ${ran5}`, (err, stderr, stdout) => {
                        if (err) {
                            fs.unlinkSync(media5);
                            return repondre("Error during procedure: " + err.message);
                        }

                        try {
                            let buff5 = fs.readFileSync(ran5);
                            zk.sendMessage(dest, { audio: buff5, mimetype: "audio/mpeg" }, { quoted: ms });
                        } catch (fileError) {
                            repondre("Error reading file: " + fileError.message);
                        } finally {
                            fs.unlinkSync(ran5);
                            fs.unlinkSync(media5);
                        }
                    });
                } catch (downloadError) {
                    repondre("Error downloading audio: " + downloadError.message);
                }
            } else {
                repondre("This command only works with audio messages");
            }
        } else {
            repondre("Please mention an audio");
        }
    }
);

// Command to smooth audio
xforcemd(
    {
        nomCom: 'smooth',
        categorie: 'Audio Editor',
    }, async (dest, zk, commandeOptions) => {
        const { ms, repondre, msgRepondu } = commandeOptions;

        if (msgRepondu) {
            if (msgRepondu.audioMessage) {
                try {
                    const mediaSmooth = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
                    let setSmooth = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
                    let ranSmooth = `${filename}.mp3`;

                    exec(`ffmpeg -i ${mediaSmooth} ${setSmooth} ${ranSmooth}`, (err, stderr, stdout) => {
                        if (err) {
                            fs.unlinkSync(mediaSmooth);
                            return repondre("Error during procedure: " + err.message);
                        }

                        try {
                            let buff6 = fs.readFileSync(ranSmooth);
                            zk.sendMessage(dest, { audio: buff6, mimetype: "audio/mpeg" }, { quoted: ms });
                        } catch (fileError) {
                            repondre("Error reading file: " + fileError.message);
                        } finally {
                            fs.unlinkSync(ranSmooth);
                            fs.unlinkSync(mediaSmooth);
                        }
                    });
                } catch (downloadError) {
                    repondre("Error downloading audio: " + downloadError.message);
                }
            } else {
                repondre("This command only works with audio messages");
            }
        } else {
            repondre("Please mention an audio");
        }
    }
);

// Continue with the 'tempo' command...
xforcemd(
    {
        nomCom: 'tempo',
        categorie: 'Audio Editor',
    }, async (dest, zk, commandeOptions) => {
        const { ms, repondre, msgRepondu } = commandeOptions;

        if (msgRepondu) {
            if (msgRepondu.audioMessage) {
                try {
                    const mediaTempo = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
                    let setTempo = '-filter:a "atempo=0.9,asetrate=65100"';
                    let ranTempo = `${filename}.mp3`;

                    exec(`ffmpeg -i ${mediaTempo} ${setTempo} ${ranTempo}`, (err, stderr, stdout) => {
                        if (err) {
                            fs.unlinkSync(mediaTempo);
                            return repondre("Error during procedure: " + err.message);
                        }

                        try {
                            let buff7 = fs.readFileSync(ranTempo);
                            zk.sendMessage(dest, { audio: buff7, mimetype: "audio/mpeg" }, { quoted: ms });
                        } catch (fileError) {
                            repondre("Error reading file: " + fileError.message);
                        } finally {
                            fs.unlinkSync(ranTempo);
                            fs.unlinkSync(mediaTempo);
                        }
                    });
                } catch (downloadError) {
                    repondre("Error downloading audio: " + downloadError.message);
                }
            } else {
                repondre("This command only works with audio messages");
            }
        } else {
            repondre("Please mention an audio");
        }
    }
);

// Command for "nightcore" effect
xforcemd(
    {
        nomCom: 'nightcore',
        categorie: 'Audio Editor',
    }, async (dest, zk, commandeOptions) => {
        const { ms, repondre, msgRepondu } = commandeOptions;

        if (msgRepondu) {
            if (msgRepondu.audioMessage) {
                try {
                    const mediaNightcore = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
                    let setNightcore = '-filter:a "atempo=1.07,asetrate=44100*1.20"';
                    let ranNightcore = `${filename}.mp3`;

                    exec(`ffmpeg -i ${mediaNightcore} ${setNightcore} ${ranNightcore}`, (err, stderr, stdout) => {
                        if (err) {
                            fs.unlinkSync(mediaNightcore);
                            return repondre("Error during procedure: " + err.message);
                        }

                        try {
                            let buff8 = fs.readFileSync(ranNightcore);
                            zk.sendMessage(dest, { audio: buff8, mimetype: "audio/mpeg" }, { quoted: ms });
                        } catch (fileError) {
                            repondre("Error reading file: " + fileError.message);
                        } finally {
                            fs.unlinkSync(ranNightcore);
                            fs.unlinkSync(mediaNightcore);
                        }
                    });
                } catch (downloadError) {
                    repondre("Error downloading audio: " + downloadError.message);
                }
            } else {
                repondre("This command only works with audio messages");
            }
        } else {
            repondre("Please mention an audio");
        }
    }
);

// Command to add echo effect to audio
xforcemd(
    {
        nomCom: 'echo',
        categorie: 'Audio Editor',
    }, async (dest, zk, commandeOptions) => {
        const { ms, repondre, msgRepondu } = commandeOptions;

        if (msgRepondu) {
            if (msgRepondu.audioMessage) {
                try {
                    const mediaEcho = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
                    let setEcho = '-filter_complex "aecho=0.8:0.9:1000:0.3"'; // Echo filter settings
                    let ranEcho = `${filename}.mp3`;

                    exec(`ffmpeg -i ${mediaEcho} ${setEcho} ${ranEcho}`, (err, stderr, stdout) => {
                        if (err) {
                            fs.unlinkSync(mediaEcho);
                            return repondre("Error during procedure: " + err.message);
                        }

                        try {
                            let buffEcho = fs.readFileSync(ranEcho);
                            zk.sendMessage(dest, { audio: buffEcho, mimetype: "audio/mpeg" }, { quoted: ms });
                        } catch (fileError) {
                            repondre("Error reading file: " + fileError.message);
                        } finally {
                            fs.unlinkSync(ranEcho);
                            fs.unlinkSync(mediaEcho);
                        }
                    });
                } catch (downloadError) {
                    repondre("Error downloading audio: " + downloadError.message);
                }
            } else {
                repondre("This command only works with audio messages");
            }
        } else {
            repondre("Please mention an audio");
        }
    }
);

// Command to change the pitch of audio
xforcemd(
    {
        nomCom: 'pitch',
        categorie: 'Audio Editor',
    }, async (dest, zk, commandeOptions) => {
        const { ms, repondre, msgRepondu } = commandeOptions;

        if (msgRepondu) {
            if (msgRepondu.audioMessage) {
                try {
                    const mediaPitch = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
                    let setPitch = '-filter:a "asetrate=44100*1.5"'; // Pitch filter settings (increase pitch)
                    let ranPitch = `${filename}.mp3`;

                    exec(`ffmpeg -i ${mediaPitch} ${setPitch} ${ranPitch}`, (err, stderr, stdout) => {
                        if (err) {
                            fs.unlinkSync(mediaPitch);
                            return repondre("Error during procedure: " + err.message);
                        }

                        try {
                            let buffPitch = fs.readFileSync(ranPitch);
                            zk.sendMessage(dest, { audio: buffPitch, mimetype: "audio/mpeg" }, { quoted: ms });
                        } catch (fileError) {
                            repondre("Error reading file: " + fileError.message);
                        } finally {
                            fs.unlinkSync(ranPitch);
                            fs.unlinkSync(mediaPitch);
                        }
                    });
                } catch (downloadError) {
                    repondre("Error downloading audio: " + downloadError.message);
                }
            } else {
                repondre("This command only works with audio messages");
            }
        } else {
            repondre("Please mention an audio");
        }
    }
);

// Command to adjust the volume of audio
xforcemd(
    {
        nomCom: 'volume',
        categorie: 'Audio Editor',
    }, async (dest, zk, commandeOptions) => {
        const { ms, repondre, msgRepondu } = commandeOptions;

        if (msgRepondu) {
            if (msgRepondu.audioMessage) {
                try {
                    const mediaVolume = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
                    let setVolume = '-filter:a "volume=2.0"'; // Volume filter settings (increase volume by 2x)
                    let ranVolume = `${filename}.mp3`;

                    exec(`ffmpeg -i ${mediaVolume} ${setVolume} ${ranVolume}`, (err, stderr, stdout) => {
                        if (err) {
                            fs.unlinkSync(mediaVolume);
                            return repondre("Error during procedure: " + err.message);
                        }

                        try {
                            let buffVolume = fs.readFileSync(ranVolume);
                            zk.sendMessage(dest, { audio: buffVolume, mimetype: "audio/mpeg" }, { quoted: ms });
                        } catch (fileError) {
                            repondre("Error reading file: " + fileError.message);
                        } finally {
                            fs.unlinkSync(ranVolume);
                            fs.unlinkSync(mediaVolume);
                        }
                    });
                } catch (downloadError) {
                    repondre("Error downloading audio: " + downloadError.message);
                }
            } else {
                repondre("This command only works with audio messages");
            }
        } else {
            repondre("Please mention an audio");
        }
    }
);

// Command to add distortion effect to audio
xforcemd(
    {
        nomCom: 'distort',
        categorie: 'Audio Editor',
    }, async (dest, zk, commandeOptions) => {
        const { ms, repondre, msgRepondu } = commandeOptions;

        if (msgRepondu) {
            if (msgRepondu.audioMessage) {
                try {
                    const mediaDistort = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
                    let setDistort = '-filter_complex "overdrive=20"'; // Distortion filter settings
                    let ranDistort = `${filename}.mp3`;

                    exec(`ffmpeg -i ${mediaDistort} ${setDistort} ${ranDistort}`, (err, stderr, stdout) => {
                        if (err) {
                            fs.unlinkSync(mediaDistort);
                            return repondre("Error during procedure: " + err.message);
                        }

                        try {
                            let buffDistort = fs.readFileSync(ranDistort);
                            zk.sendMessage(dest, { audio: buffDistort, mimetype: "audio/mpeg" }, { quoted: ms });
                        } catch (fileError) {
                            repondre("Error reading file: " + fileError.message);
                        } finally {
                            fs.unlinkSync(ranDistort);
                            fs.unlinkSync(mediaDistort);
                        }
                    });
                } catch (downloadError) {
                    repondre("Error downloading audio: " + downloadError.message);
                }
            } else {
                repondre("This command only works with audio messages");
            }
        } else {
            repondre("Please mention an audio");
        }
    }
);

// Command to add fade-in or fade-out effect to audio
xforcemd(
    {
        nomCom: 'fade',
        categorie: 'Audio Editor',
    }, async (dest, zk, commandeOptions) => {
        const { ms, repondre, msgRepondu } = commandeOptions;

        if (msgRepondu) {
            if (msgRepondu.audioMessage) {
                try {
                    const mediaFade = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
                    let setFade = '-filter:a "afade=t=in:st=0:d=5"'; // Fade-in effect settings (start at 0s, duration 5s)
                    let ranFade = `${filename}.mp3`;

                    exec(`ffmpeg -i ${mediaFade} ${setFade} ${ranFade}`, (err, stderr, stdout) => {
                        if (err) {
                            fs.unlinkSync(mediaFade);
                            return repondre("Error during procedure: " + err.message);
                        }

                        try {
                            let buffFade = fs.readFileSync(ranFade);
                            zk.sendMessage(dest, { audio: buffFade, mimetype: "audio/mpeg" }, { quoted: ms });
                        } catch (fileError) {
                            repondre("Error reading file: " + fileError.message);
                        } finally {
                            fs.unlinkSync(ranFade);
                            fs.unlinkSync(mediaFade);
                        }
                    });
                } catch (downloadError) {
                    repondre("Error downloading audio: " + downloadError.message);
                }
            } else {
                repondre("This command only works with audio messages");
            }
        } else {
            repondre("Please mention an audio");
        }
    }
);
