export async function registerServiceWorker(){
 if("serviceWorker" in navigator){await navigator.serviceWorker.register("./sw.js");}
}
export function initializeInstallPrompt(){}
export function watchInstallation(){}
