const note = require('./noteHandler');

const ACTIONS = {
    get: note.getFromDB,
    add: note.addToDB,
    del: note.delFromDB,
    update: note.updateDB,
    patch: note.patchDB,
}

module.exports = async (dataBase, req, res, action) => {
    try {
            const result = await ACTIONS[action](dataBase, req);
            if (result) {        
                res.status(200).json({ status: 'ok', result });
                console.log(`==> successfully ${action}`);
            } else {
                res.json({ status: 'fail', message: 'Server error' });
            }
    }
    catch (err) {
        console.warn(`==> fail ${action}` + err);
        res.status(500).json({ status: 'fail', message: 'Server error' });
    }
}
