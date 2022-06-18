import * as fs from 'fs';

const normal_url = 'https://getschiffynft.mypinata.cloud/ipfs/QmQRB225XajJPN4fUpgnqKgY3y6VB2ErPrT1Cx2jMVBnFS/';
const gold_url = 'https://getschiffynft.mypinata.cloud/ipfs/QmWJSc4qag7xEK5VnQNMPN1yv2ZQAUJU5PBk57pcNaWj5o/';
const silver_url = 'https://getschiffynft.mypinata.cloud/ipfs/QmVPMbthXBp632CYuXn9uQ6UvrP7psw298jMoXgamff3fz/';

const address_metadata_files = './silver/metadata';
replace_url_image(address_metadata_files, silver_url);


function replace_url_image(address_files, url_address)  
{
  var files = fs.readdirSync(address_files)

  files.forEach((file, index) =>
  {
    console.log("ABRIENDO " + file);
    var rawdata = fs.readFileSync((address_files+'/'+file));
    var jsonMetadata = JSON.parse(rawdata);

    jsonMetadata.image = (url_address+(parseInt(file))+'.png');

    fs.writeFileSync((address_files+'/'+file), JSON.stringify(jsonMetadata));

    console.log('ESCRIBIENDO: '+ file +' - INDEX [ '+(index+1)+' ]');
  });
}