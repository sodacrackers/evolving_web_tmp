// Create right-click menu items
chrome.contextMenus.create({
  id: "convertToMarkdown",
  title: "Copy as Markdown",
  contexts: ["selection"],
});

chrome.contextMenus.create({
  id: "convertToRichText",
  title: "Copy as Rich Text",
  contexts: ["selection"],
});

// Handle right-click menu actions
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convertToMarkdown") {
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["src/turndown.js"],
      }, () => {
          chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: convertSelectionToMarkdown,
          });
      });
  } else if (info.menuItemId === "convertToRichText") {
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["src/showdown.min.js"],
      }, () => {
          chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: convertSelectionToRichText,
          });
      });
  }
});

// Convert Rich Text to Markdown
function convertSelectionToMarkdown() {
  const turndownService = new TurndownService();
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const container = document.createElement("div");
      container.appendChild(range.cloneContents());

      // Convert the HTML content of the selection to Markdown
      const markdown = turndownService.turndown(container.innerHTML);

      // Copy the Markdown to clipboard
      navigator.clipboard.writeText(markdown).catch(err => console.error(err));
  }
}

// Convert Markdown to Rich Text (as rich content for Word/Google Docs)
function convertSelectionToRichText() {
  const converter = new showdown.Converter();
  const selection = window.getSelection();

  if (selection.rangeCount > 0) {
      const markdown = selection.toString();

      // Convert Markdown to HTML
      const html = converter.makeHtml(markdown);

      // Create a ClipboardItem with `text/html` for rich text support
      const blob = new Blob([html], { type: "text/html" });
      const clipboardItem = new ClipboardItem({ "text/html": blob });

      // Write to the clipboard
      navigator.clipboard.write([clipboardItem]).catch(err => console.error("Clipboard error:", err));
  }
}

