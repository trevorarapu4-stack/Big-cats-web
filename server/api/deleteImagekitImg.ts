
export default defineEventHandler(async (event) => {

    const { fileId } = await readBody(event)

    if (!fileId) {
        return { error: 'Missing fileId query parameter.' };
    }

    const encodedAuth = Buffer.from(`${useRuntimeConfig().IMAGEKIT_PRIVATE_KEY}:`).toString('base64');

    try {
        const response = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${encodedAuth}`
            }
        });

        if (response.status === 204) {
            // Success - No content returned
            return { success: true, message: 'Image deleted successfully.' };
        }

        const data = await response.json();

        if (!response.ok) {
            return { error: data.message };
        }

        return { success: true, data };
    } catch (error) {
        console.error('ImageKit delete error:', error);
        return { success: false }
    }
})
