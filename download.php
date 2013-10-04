<?php
/**
 * FlxZipArchive, Extends ZipArchiv.
 * Add Dirs with Files and Subdirs.
 *
 * <code>
 *  $archive = new FlxZipArchive;
 *  // .....
 *  $archive->addDir( 'test/blub', 'blub' );
 * </code>
 */
class FlxZipArchive extends ZipArchive {
  /**
   * Add a Dir with Files and Subdirs to the archive
   *
   * @param string $location Real Location
   * @param string $name Name in Archive
   * @author Nicolas Heimann
   * @access private
   **/

  public function addDir($location, $name) {
    $this->addEmptyDir($name);

    $this->addDirDo($location, $name);
  } // EO addDir;

  /**
   * Add Files & Dirs to archive.
   *
   * @param string $location Real Location
   * @param string $name Name in Archive
   * @author Nicolas Heimann
   * @access private
   **/

  private function addDirDo($location, $name) {
    $name .= '/';
    $location .= '/';

    // Read all Files in Dir
    $dir = opendir ($location);
    while ($file = readdir($dir))
    {
      if ($file == '.' || $file == '..' || $file == '.DS_Store' ||
        $file == 'config.rb' || $file == '.htaccess' ||
        (substr($file, -3) == 'php') || (substr($file, -4) == 'json') || (substr($file, -3) == 'zip') ||
        $file == '.idea' || $file == '.sass-cache' || $file == '.svn'
      ) continue;

      // Rekursiv, If dir: FlxZipArchive::addDir(), else ::File();
      if(filetype( $location . $file) == 'dir'){
        $this->addDir($location . $file, $name . $file);

      }else{
        $this->addFile($location . $file, $name . $file);
      }


      $do = (filetype( $location . $file) == 'dir') ? 'addDir' : 'addFile';
      $this->$do($location . $file, $name . $file);
    }
  } // EO addDirDo();
}

$the_folder = './';
$zip_file_name = './PaperSmart.zip';

@unlink($zip_file_name);

$za = new FlxZipArchive;

$res = $za->open($zip_file_name, ZipArchive::CREATE);

if($res === TRUE) {
  $za->addDir($the_folder, basename($the_folder));
  $za->close();
} else {
  echo 'Could not create a zip archive';
}

header('Content-type: application/zip');

// It will be called test.zip
header('Content-Disposition: attachment; filename="PaperSmart'. date('Ymd_His') .'.zip"');

//read a file and send
readfile('PaperSmart.zip');