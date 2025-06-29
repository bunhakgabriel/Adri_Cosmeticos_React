export const converteFileBase64 = (e) => {
    return new Promise((resolve, reject) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target?.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            resolve('');
        }
    });
};