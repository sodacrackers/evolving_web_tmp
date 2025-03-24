function onOpen() {
  DocumentApp.getUi()
    .createMenu("Meyer Utils")
    .addItem("Markdown Converter Sidebar", "showSidebar")
    .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile("Sidebar")
    .setTitle("Markdown Converter");
  DocumentApp.getUi().showSidebar(html);
}
