// File: src/utils/imageHelper.js

export const getDirectImageUrl = (urlOrId) => {
    if (!urlOrId) return '';

    // Lấy ID từ URL nếu là link Google Drive
    let fileId = urlOrId;
    const match = urlOrId.match(/\/d\/(.+?)\//) || 
                  urlOrId.match(/id=(.+?)(&|$)/); 
                  
    if (match && match[1]) {
        fileId = match[1];
    }

    // SỬ DỤNG LINK THAY THẾ (Dịch vụ này của Google chuyên dùng để nhúng ảnh công khai)
    // Cách này sẽ không bị chặn bởi bất kỳ chính sách Referrer hay Cookie nào
    return `https://lh3.googleusercontent.com/d/${fileId}=s200`;
};