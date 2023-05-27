import * as fs from 'fs';

// Get resources address
const RESOURCES = './resources/';

// NFT name
const NFT_NAME = 'Besa Gaming OG';

// Metada schema
const METADATA_SCHEMA = {
  name: '', // rename
  description: 'Original Series Besa Gaming NFT',
  external_url: '', // rename
  image: '', // rename
  attributes: [
    {
      trait_type: 'Edition',
      value: 'Original series',
    },
  ],
  properties: {
    files: [
      {
        uri: '', // rename
        type: 'image/jpeg',
      },
    ],
    creators: ['Gabriel Navarro', 'Jonathan Urdaneta'],
  },
  compiler: 'https://github.com/Johnmub/organize-nfts',
};
// Call function to images
rename_files(RESOURCES + '/images/', '.jpeg', 1, true);

// Call function to rename metadata
// rename_files(RESOURCES + '/metadata/', '.json', 1);

// ***************
// Functions
// ***************

// Rename files
function rename_files(
  filesAddress = '',
  fileType = '',
  start = 1,
  createMeta = false
) {
  const fileName = parseNft_name();

  // Get all files
  const _files = fs.readdirSync(filesAddress);

  // Iterate on each file
  _files.forEach((file, index) => {
    fs.renameSync(
      // Old file
      filesAddress + file,
      // New file
      // Address + NFT name + NFT number + TYPE file
      filesAddress + fileName + (start + index) + fileType
    );

    if (createMeta) create_metadata(fileName, start + index, fileType);

    // Message
    console.log(
      'Generating ' + fileType.toUpperCase() + ' File N° ' + (index + 1)
    );
  });
}

// Function to create metadata
function create_metadata(fileName = '', currentIndex = '', fileType = '') {
  let setMetadata = METADATA_SCHEMA;
  setMetadata.name = NFT_NAME + ' #' + currentIndex;
  setMetadata.properties.files[0].uri = currentIndex + '.jpeg';

  // Buffering
  const buffer = Buffer.from(JSON.stringify(setMetadata));

  // Create file
  fs.writeFileSync(
    RESOURCES + '/metadata/' + fileName + currentIndex + '.json',
    buffer
  );
}

// Convert NFT name to file_name
function parseNft_name() {
  return NFT_NAME.toLowerCase().replaceAll(' ', '_') + '_';
}
