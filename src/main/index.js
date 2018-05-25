import { app, shell } from "electron";
import createFileManager from "./createFileManager";
import trimDesktop from "./trimDesktop";
import createCaptureWindow from "./createCaptureWindow";
import createPreviewWindow from "./createPreviewWindow";

let captureWindow;

function captureAndOpenItem() {
  const fileManager = createFileManager();
  return trimDesktop()
    .then(captureWindow.capture.bind(captureWindow))
    .then(image => {
      // 一時ファイル保存用ディレクトリに取得した画像を保存
      const createdFilename = fileManager.writeImage(app.getPath("temp"), image);
      return createdFilename;
    })
    .then(shell.openItem.bind(shell))
    .then(() => {
      if (process.platform !== "darwin") {
        app.quit();
      }
    })
  ;
}

function captureAndPost() {
  const fileManager = createFileManager();
  return trimDesktop()
    .then(captureWindow.capture.bind(captureWindow))
    .then(image => {
      // 一時ファイル保存用ディレクトリに取得した画像を保存
      const createdFilename = fileManager.writeImage(app.getPath("temp"), image);
      return createdFilename;
    })
    .then(filename => {
      const win = createPreviewWindow({ filename });
      // ツイート完了時の処理
      win.once("DONE_TWEET", ({ url }) => {
        shell.openExternal(url);
        win.close();
        if (process.platform !== "darwin") {
          app.quit();
        }
      });
    })
  ;
}

app.on("ready", () => {
  captureWindow = createCaptureWindow();
  // captureAndOpenItem();
  captureAndPost();
});
