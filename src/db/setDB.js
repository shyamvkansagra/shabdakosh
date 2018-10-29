export default function() {
    if (window.indexedDB) {
        console.log('Yay');
        return 'success';
    }
}