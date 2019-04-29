# Installation guide

1. Connect to robot via SSH. [Link](https://www.ev3dev.org/docs/tutorials/connecting-to-ev3dev-with-ssh/)
1. Check if `python3` is installed by typing `python3 -v`
1. If `python3` is not installed, then follow [here](https://docs.python-guide.org/starting/install3/linux/) to install it
1. Install `pip3` following this [link](https://linuxize.com/post/how-to-install-pip-on-ubuntu-18.04/)
1. Run `pip3 install -r requirements.txt` to install all dependencies
1. Run `python3 main.py` from terminal or execute file `main.py` on robot user interface

* For development purpose, use `ev3dev-browser` extension on Visual Studio Code to connect and transfer file to robot. 
[Link](https://github.com/ev3dev/vscode-ev3dev-browser) 