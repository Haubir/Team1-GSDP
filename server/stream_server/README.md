livecam
Webcam live-streaming solution using GStreamer and Node.js

installation
To obtain this module, type in npm install livecam. You also need GStreamer 1.3+ runtime installed on your machine.

windows
depending on your architecture, you may download the latest runtimes provided and maintained by the GStreamer project. They usually come in MSI installer format. You do not need the development installers. Naming of the runtime package follows the gstreamer-1.0-<arch>-<version>.msi convention.

After installation, make sure you have GSTREAMER_1_0_ROOT_<arch> environment variable defined in your system. This is a variable created by the MSI installer, pointing to where you installed the runtime package.

linux
GStreamer might be already available on your machine. You may verify its existence by typing gst-launch-1.0 --version on your command line. If this command is not available, you can obtain GStreamer from your distro's package manager.

mac osx
This module was never tested nor designed to run on Apple platforms, however if you wish to proceed with running it on an Apple platform, you may obtain GStreamer runtime via Homebrew.

usage:

node streamserver.js

Credit: https://www.npmjs.com/package/livecam
