const fs = require('fs/promises');
const path = require('path');

const sortFolder = async (read) => {
    try {
        const readPathFolder = path.join(__dirname, read);
        const files = await fs.readdir(readPathFolder);

        for (const file of files) {
            const stat = await fs.stat(path.join(readPathFolder, file))

            if (stat.isFile()) {
                await fs.rename(path.join(read, file), path.join(__dirname, 'exitFolder', file));
            }

            if (stat.isDirectory()) {
                await sortFolder(path.join(read, file))
            }

        }
    } catch (e) {
        console.error(e);
    }
};

sortFolder('allFiles');