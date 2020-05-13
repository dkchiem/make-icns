# make-icns

[![npm version](https://badge.fury.io/js/make-icns.svg)](https://www.npmjs.com/package/make-icns) [![license](https://img.shields.io/github/license/Doudou8/make-icns)](https://github.com/electron-userland/electron-forge/blob/master/LICENSE) [![dependencies](https://david-dm.org/Doudou8/make-icns.svg?theme=shields.io)](https://david-dm.org/Doudou8/make-icns.svg)

**make-icns** is a cli that converts a single PNG image into a ICNS image. It does very quickly with very good quality! It is designed to be simple to use on your local machine and to be easy to implement in other projects.

## Installation

> You may need to use `sudo` to install the package globally. If you get an error installing with sudo, you might want to add`--unsafe-perm` to the command. This CLI has been tested on _macOS Catalina_ and _Ubuntu 18.04 (LTS)_.

```bash
$ npm i -g make-icns
```

After installing the cli globally or on your project, you are ready to use it.

## Usage

> In order to get a good quality icon, the picture must be at least 1024x1024 pixels.

This command will convert your PNG into an ICNS in the destination directory. The generated ICNS file will by default take the name of the PNG file. Note that the new image will also override any ICNS file with the same name and extension in the destination directory.

Command:

```bash
$ mk-icns <png-file-path> <destination-directory>
```

Options:

| Options          |          Desription          |   Type |
| ---------------- | :--------------------------: | -----: |
| -n               | Name the generated ICNS file | string |
| -h, --help, help |          Show help           |      - |

Example:

```bash
$ mk-icns /path/to/pngFile.png /destination/directory -n "ThisIsAnICNSFile"
```

## Author

- **Vu Dang Khoa Chiem** - Doudou8

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
