var tabCmds = [];
let cm = [];
function xforcemd(obj, functions) {
    let infoComs = obj;
    if (!obj.categorie) {
        infoComs.categorie = "General";  // Translated "Général"
    }
    if (!obj.reaction) {
        infoComs.reaction = "💫";
    }
    infoComs.function = functions;  // Renamed 'fonction' to 'function'
    cm.push(infoComs);
    // console.log('loading...')  // Translated "chargement..."
    return infoComs;
}
module.exports = { xforcemd, Module: xforcemd, cm };
