import * as fs from 'fs';

const RESOURCES = './resources/';
const NFT_NAME = 'Besa Gaming OG';
const IPFS_IMAGES_ADDRESS =
  'https://besagaming.mypinata.cloud/ipfs/QmYqYM59L9j5LdM88FhjdkuSfgJZABY9PSSBD2LUiEKhoR/';
const ADDRESS_METADATA_FILES = RESOURCES + '/metadata';

// Execute
replace_url_image(ADDRESS_METADATA_FILES, IPFS_IMAGES_ADDRESS, '.jpeg');

// Functions
function replace_url_image(address_files, url_address, fileType = '') {
  const _files = fs.readdirSync(address_files);

  _files.forEach((file, index) => {
    console.log('ABRIENDO ' + file + ' N°' + (index + 1));

    const rawData = fs.readFileSync(address_files + '/' + file);
    const jsonMetadata = JSON.parse(rawData);
    const fileName =
      url_address + parseNft_name() + (index + 1) + fileType.toLowerCase();

    jsonMetadata.external_url = fileName;
    jsonMetadata.image = fileName;

    fs.writeFileSync(address_files + '/' + file, JSON.stringify(jsonMetadata));

    console.log('ESCRIBIENDO: ' + file + ' - INDEX [ ' + (index + 1) + ' ]');
  });
}

// Convert NFT name to file_name
function parseNft_name() {
  return NFT_NAME.toLowerCase().replaceAll(' ', '_') + '_';
}
