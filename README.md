# MedhaVIT Proctor Guard Extension

MedhaVIT Proctor Guard is an official browser security extension designed to ensure exam integrity by detecting active third-party extensions during MedhaVIT online quizzes.

---

## 🛠️ Requirements

Before installing, ensure your system meets the following requirements:
* **Operating System**: Windows 10/11, macOS (10.15+), Linux (Ubuntu, Debian, Fedora, Arch), or ChromeOS.
* **Supported Browsers**: Google Chrome, Microsoft Edge, Brave Browser, Opera, Mozilla Firefox, or Apple Safari.
* **Tools (Optional for Git source install)**: [Git](https://git-scm.com/) and [Node.js / npm](https://nodejs.org/).

---

## 📥 Installation Guide

### Method 1: Installing via Browser Extension Stores

* **Chrome / Edge / Brave / Opera**: Install directly from the [Chrome Web Store](https://chromewebstore.google.com/) *(Store link available upon publishing)*.
* **Firefox**: Install directly from [Firefox Add-ons](https://addons.mozilla.org/) *(Store link available upon publishing)*.

---

### Method 2: Installing via Source Code / Developer Mode

#### 1. Download the Source Code
Choose one of the following:
* **Option A (Via Git)**: Open terminal and run:
  ```bash
  git clone https://github.com/ArhamShah01/Medhavit-Extension.git
  ```
* **Option B (Direct Download)**: Click **Code ➔ Download ZIP** on GitHub, then unzip the downloaded `.zip` folder.

---

#### 2. Load into Your Browser

##### 🌐 Chromium Browsers (Google Chrome, Microsoft Edge, Brave, Opera)
1. Open your browser and navigate to:
   * Chrome: `chrome://extensions`
   * Edge: `edge://extensions`
   * Brave: `brave://extensions`
2. Enable **Developer mode** (toggle in top-right corner).
3. Click **Load unpacked** (top-left).
4. Select the `Medhavit-Extension` folder.

##### 🦊 Mozilla Firefox (Windows, macOS, Linux)
1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...**
3. Select `manifest.json` inside the `Medhavit-Extension` folder.

##### 🍎 Apple Safari (macOS)
1. Open Safari ➔ **Settings** (`Cmd + ,`) ➔ **Advanced** ➔ Check **Show features for web developers**.
2. From the top menu bar, select **Develop** ➔ Check **Allow Unsigned Extensions**.
3. Select the `Medhavit-Extension` folder.
