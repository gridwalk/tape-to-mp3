var prompt = require('prompt');
var spawn  = require('child_process').spawn;
var id3    = require('id3-writer');
var fs     = require('fs');

prompt.start();

prompt.get(['artist','title','year'], function (err, result) {
  if (err) { return onErr(err); }

  artist   = result.artist;
  
  if( result.year ){
    year = parseInt(result.year);
  }else{
    year = 0000;
  }

  if( result.title ){
    title = result.title;
    slug = to_slug(artist) + '_ '+ to_slug(title);
  }else{
    title = 'Tape'
    slug = to_slug(artist);
  }
  
  filename = slug+'.mp3';

  record = spawn('rec',[filename, 'rate', '48000', 'silence', '1', '0.1', '3%', '1', '30.0', '3%']);

  record.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
  });

  record.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });

  record.on('exit', function (code) {
    
    // set the ID3 Tags
    var writer = new id3.Writer();
    var file = new id3.File(filename);
    var meta = new id3.Meta({
        artist : artist,
        title  : title,
        album  : 'Old Cassettes',
        year   : year
    });
 
    writer.setFile(file).write(meta, function(err) {
      if (err) { return onErr(err); }
      console.log( "ID3 set" );

      // move mp3 to the Tapes folder
      fs.rename(filename,'../../Audio/Tapes/'+filename,function(err){
        if (err) { return onErr(err); }
        console.log('Done!');

      });
    });
  });
});

function onErr(err) {
  console.log(err);
  return 1;
}

function to_slug(text){
  return text
    .toLowerCase()
    .replace(/ /g,'-')
    .replace(/[^\w-]+/g,'');
}