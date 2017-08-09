Game of life
============

This is a simple game of life.  The goal of this project is more a
proof-of-concept of using WebAssembly with Rust source code.  The processing of
the game of life is done in Rust, the displaying is done with canvas in the
webbrowser.

# Cargo compiling
To compile with Cargo, you need some other things installed (emscripten) and
tell to cargo to compile to WebAssembly.

```
cargo build --target asmjs-unknown-emscripten
```

If you want to know more about what to install and how to compile, the [Rusty
Web](https://www.gitbook.com/book/davidmcneil/the-rusty-web/details) is a nice
tutorial to start up.

# Getting emscripten
To get emscripten, the only way is to compile `clang` which can be pretty tough
for your computer.  In some cases (old computers), it's not even possible (it
will rush on your RAM).  So here is an idea, ask a friend with a powerful
computer to compile it as a Docker image and push the image on DockerHub.
You'll find such an image on
[aveuh/rust-emscripten](https://hub.docker.com/r/aveuh/rust-emscripten/).

This image is not perfect because it doesn't expose the programs we need on
`PATH`.  But you can build your own on top of it.  Here is a `Dockerfile` you
could build to solve that problem.

```
FROM aveuh/rust-emscripten:latest
MAINTAINER woshilapin "woshilapin@tuziwo.info"
LABEL version="1.0"

ENV PATH $PATH:/emsdk-portable/emscripten/incoming:/root/.cargo/bin
```

Build it with the following command (it may take a while since the base image is
big).

    docker build --tag rust-emscripten ./

Now, you can run Cargo with the following command.
```
docker run \
	--workdir /tmp \
	--volume /path/to/your/project/on/host:/tmp \
	--name webassembly
	--interactive \
	--tty \
	--rm rust-emscripten \
	cargo build --target asmjs-unknown-emscripten
```
