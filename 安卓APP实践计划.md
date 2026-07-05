# 临界点 · 安卓 APP 自主实践计划

把已上线的离线 PWA（`https://programmerdream.github.io/hot100-crux/`）做成一个**装完即离线、自包含的安卓 APK**，可直接发到手机安装，不依赖浏览器、不依赖在线地址。

## 一、技术选型（为什么是 Capacitor）

真出 APK 绕不开 JDK + Android SDK + Gradle。在此前提下，把现成静态网页变 APK 有三条路，取舍如下：

| 方案 | 离线 | 更新卡库 | 复杂度 | 结论 |
|---|---|---|---|---|
| **Capacitor**（网页资源打进 APK） | ✅ 装完即离线，不碰网络 | 需重打包 | 中，主流成熟 | **选它**——最贴合"离线自包含" |
| TWA/Bubblewrap（APK 只是壳，指向线上地址） | 首启需联网，之后靠 SW | 改网页自动更新 | 中，需 assetlinks | 依赖在线地址，离线体验弱 |
| 手写原生 WebView 工程 | ✅ | 需重打包 | 高，重造轮子 | 违反"别造轮子" |

Capacitor 把 `www/` 里的 index.html/cards.js/sw.js/... 复制进 APK 的 assets，WebView 本地加载，**从安装那一刻起就全离线**。符合项目"离线硬约束 + 参考主流实现"。

## 二、环境现状（2026-07-06 探测）

- ✅ JDK 17（Corretto，`JAVA_HOME` 已设）— Capacitor 7 / AGP 8 正好要 JDK 17
- ✅ Node 24 / npx 11
- ❌ Android SDK / sdkmanager / adb / gradle / Android Studio — **全无，需自行安装 SDK 命令行工具**

## 三、执行步骤

1. **装 Android SDK**（命令行工具，无需 Android Studio）
   - 下载 `commandlinetools-win` → 解压到 `C:\Android\sdk\cmdline-tools\latest\`
   - `sdkmanager` 装 `platform-tools`、`platforms;android-34`、`build-tools;34.0.0`，接受 licenses
   - 设 `ANDROID_HOME` / `ANDROID_SDK_ROOT`
2. **接入 Capacitor**
   - `npm i @capacitor/core @capacitor/cli @capacitor/android`
   - `www/` = 5 个应用文件（index.html / cards.js / sw.js / manifest / icon），`scripts/build-web.js` 一键同步
   - `cap init` → `cap add android` → `cap sync`
3. **打包 APK**
   - `android/local.properties` 写 `sdk.dir`
   - `./gradlew assembleDebug` → `android/app/build/outputs/apk/debug/app-debug.apk`
4. **交付**：把 APK 传手机安装（开启"未知来源"），或挂到 GitHub Release 供手机直接下载

## 四、执行状态（已完成 ✅）

- [x] **安装 Android SDK**：命令行工具解压到 `C:\Android\sdk`，装了 `platform-tools` / `platforms;android-34` / `build-tools;34.0.0`，licenses 已接受
- [x] **接入 Capacitor**：`@capacitor/{core,cli,android}@8.4`，`www/` 打包资源（`scripts/build-web.js` 同步），`cap init/add/sync` 生成 `android/` 工程、网页已进 `assets/public/`
- [x] **打出 APK**：`android/app/build/outputs/apk/debug/app-debug.apk`，**4.2 MB**
- [x] **交付**：挂到 GitHub Release，手机可直接下载安装

### 关键坑与解法

1. **Capacitor 8 要求 JDK 21，本机只有 JDK 17** → 编译报「无效的源发行版：21」。
   解法：另装免安装版 **Corretto 21**（`C:\jdk21\jdk21.0.11_10`），构建时 `JAVA_HOME` 指向它，不动系统 JDK 17。
2. `sdkmanager --licenses` 交互卡住 → 用管道喂 `y`；打包只需 platform+build-tools，adb 可选。
3. gh 是 Windows 程序，认不了 MSYS 的 `/c/` 路径 → 传 `C:/...` 形式。

### 产物信息

- 包名 `com.programmerdream.hot100crux`，应用名「临界点」，minSDK 24（Android 7.0+），targetSDK 36
- **370 张卡（cards.js 601KB）+ index.html 已打进 APK**，装完即全离线
- 下载：https://github.com/ProgrammerDream/hot100-crux/releases/tag/v1.0-apk

### 重新打包（卡库更新后）

```bash
node scripts/build-web.js              # 同步最新网页到 www/
npx cap sync android                   # 复制进 android 工程
cd android
JAVA_HOME=C:/jdk21/jdk21.0.11_10 ANDROID_HOME=C:/Android/sdk ./gradlew.bat assembleDebug
# 产物：android/app/build/outputs/apk/debug/app-debug.apk
```

### 后续（可选）

- 出正式签名版（release APK + 自建 keystore），可上架/长期分发
- 应用图标换成项目图标（现在是 Capacitor 默认图标）
- 若想「改网页自动更新、不用重装」→ 可另出 TWA 版指向 GitHub Pages
