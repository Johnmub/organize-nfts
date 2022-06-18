import * as fs from 'fs';

const address_nfts_files = './silver/assets';
rename_files(address_nfts_files, '.png', 0);

const address_jsons_files = './silver/metadata';
rename_files(address_jsons_files, '.json', 0);

function rename_files(address_files, type_file, starting_point)  {
  var files = fs.readdirSync(address_files)

  files.forEach((file, index) => {
    fs.renameSync((address_files+'/'+file), (address_files+'/'+(starting_point+(index+1))+type_file));
    console.log((index+1));
  });
}