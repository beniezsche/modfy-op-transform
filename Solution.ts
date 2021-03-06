type FileTypes = 'video' | 'audio' | 'image' | 'other'

type FileWithMetadata = {
  file: string // Replaced file with string to make it easier
  customType: FileTypes
  // ... Extra stuff
}


type InputFilesType = {
  video?: FileWithMetadata[]
  audio?: FileWithMetadata[]
  image?: FileWithMetadata[]
  other?: FileWithMetadata[]
}

type FileTransformType = {
  state: 'Move' | 'Insert' | 'Delete'
  position?: number // Position A
  fileObj?: FileWithMetadata
  type: FileTypes
  secondPosition?: number // Position B
}

function isValid(
  stale: InputFilesType,
  latest: InputFilesType,
  transform: FileTransformType[]
): boolean {

  if(stale == null || latest == null){
    console.log(false)
    return false
  }
    
  let temp: InputFilesType = stale

  temp.video = Array.isArray(stale.video) ?  stale.video : new Array<FileWithMetadata>()
  temp.image = Array.isArray(stale.image) ?  stale.image : new Array<FileWithMetadata>()
  temp.audio = Array.isArray(stale.audio) ?  stale.audio : new Array<FileWithMetadata>()
  temp.other = Array.isArray(stale.other) ?  stale.other : new Array<FileWithMetadata>()

  for(var i = 0; i < transform.length; i++) {

      if(transform[i].state === 'Insert') {
        insertIntoFileType(temp, transform[i].fileObj)
      }

      if(transform[i].state === 'Delete') {
        deleteFromFileType(temp, transform[i].type, transform[i].position)
      }

      if(transform[i].state === 'Move') {
        moveInFileType(temp, transform[i].type, transform[i].position, transform[i].secondPosition)
      }

  }


  let isVideoEqual = checkForArrayEquality(temp.video!,latest.video)
  let isAudioEqual = checkForArrayEquality(temp.audio!,latest.audio)
  let isImageEqual = checkForArrayEquality(temp.image!,latest.image)
  let isOtherEqual = checkForArrayEquality(temp.other!,latest.other)


  if(isAudioEqual && isVideoEqual && isImageEqual && isOtherEqual){
    console.log(true)
    return true
  }
  else{
    console.log(false)
    return false
  } 
    
}

function checkForArrayEquality(temp: FileWithMetadata[], files?: FileWithMetadata[] ): boolean {

    if(typeof files === 'undefined') 
      return true

    if(temp.length != files!.length ) {
      return false
    }

    let isEqual = true

    for(var i = 0; i < temp.length; i++) {
        if(temp[i].file != files![i].file)
            return false

    }

    return isEqual
}


function moveFiles(files: FileWithMetadata[], position: number, secondPosition: number) {

  let item1 = files?.[position!]
  let item2 = files?.[secondPosition!]

  files.splice(position!, 1)
  files.splice(position!,0,item2!)

  files.splice(secondPosition!, 1)
  files.splice(secondPosition!,0,item1!)
}


function moveInFileType(temp: InputFilesType, fileType: string, position?: number, secondPosition?: number) {

    if(fileType === 'video'){

      var maxLen = temp.video?.length

      if(position! > -1 && position! < maxLen! && secondPosition! > -1 && secondPosition! <= maxLen!) {
          moveFiles(temp.video!, position!, secondPosition!)
      }

    }
    else if(fileType === 'image'){

      var maxLen = temp.image?.length

      if(position! > -1 && position! < maxLen! && secondPosition! > -1 && secondPosition! <= maxLen!) {
         moveFiles(temp.image!, position!, secondPosition!)
      }

    }
    else if(fileType === 'audio'){

      var maxLen = temp.audio?.length

      if(position! > -1 && position! < maxLen! && secondPosition! > -1 && secondPosition! <= maxLen!) {
           moveFiles(temp.audio!, position!, secondPosition!)
      }

    }
    else{

      var maxLen = temp.other?.length

      if(position! > -1 && position! < maxLen! && secondPosition! > -1 && secondPosition! <= maxLen!) {
             moveFiles(temp.other!, position!, secondPosition!)
      }
    }

}

function deleteFromFileType(temp: InputFilesType, fileType: string, position?: number ) {

    if(fileType === 'video'){

        var maxLen = temp.video?.length

	        if(position! < maxLen!) {
	            temp.video?.splice(position!,1)
	        }

    }
    else if(fileType === 'image'){

        var maxLen = temp.image?.length

	        if(position! < maxLen!) {
	            temp.image?.splice(position!,1)
	        }

    }
    else if(fileType === 'audio'){

        var maxLen = temp.audio?.length

	        if(position! < maxLen!) {
	            temp.audio?.splice(position!,1)
	        }

    }
    else{

        var maxLen = temp.other?.length

        if(position! < maxLen!) {
            temp.other?.splice(position!,1)
        }

    }
}

function printFiles(tag: string, files: FileWithMetadata[]) {

  console.log(tag)
  for(var i = 0; i < files.length; i++){
    console.log("file: " + files[i].file + " type: " + files[i].customType)
  }

}

function insertIntoFileType(temp: InputFilesType, fileObj?: FileWithMetadata) {

  if(fileObj?.customType === 'video'){
    temp.video?.push(fileObj)
  }
  else if(fileObj?.customType === 'image'){
    temp.image?.push(fileObj)
  }
  else if(fileObj?.customType === 'audio'){
    temp.audio?.push(fileObj)
  }
  else {
    temp.other?.push(fileObj!)
  }
}
