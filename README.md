# make-icns

[![npm version](https://badge.fury.io/js/make-icns.svg)](https://www.npmjs.com/package/make-icns) [![license](https://img.shields.io/github/license/dkchiem/make-icns)](https://github.com/electron-userland/electron-forge/blob/master/LICENSE) [![dependencies](https://david-dm.org/dkchiem/make-icns.svg?theme=shields.io)](https://david-dm.org/dkchiem/make-icns.svg)

**make-icns** is a CLI that converts a single PNG image into a ICNS image. It does this very quickly with very good quality! This CLI is designed to be simple to use on your local machine and to implement in other projects.

## Installation

> You may need to use `sudo` to install the package globally. If you get an error installing with sudo, you can try to add`--unsafe-perm` to the command. This CLI has been tested on _macOS Ventura_ and _Ubuntu 18.04 (LTS)_.

```bash
$ npm i -g make-icns
```

After installing the cli globally or on your project, you are ready to use it.

## Usage

> In order to get a good quality icon, it is highly recommended that the picture be at least 1024x1024 pixels.

This command will convert your PNG into an ICNS in the destination directory. The generated ICNS file will by default take the name of the PNG file. Note that the new image will also override any ICNS file with the same name and extension in the destination directory.

Command:

```bash
$ mk-icns <png-file-path> <destination-directory>
```

Options:

| Options          |           Desription            |   Type |
| ---------------- | :-----------------------------: | -----: |
| -n               | Name of the generated ICNS file | string |
| -h, --help, help |            Show help            |      - |

Example:

```bash
$ mk-icns /path/to/pngFile.png /destination/directory -n "This_Is_An_ICNS_File"
```

## Author

- **Dang Khoa Chiem** - dkchiem

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
