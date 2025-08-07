import ImageKit from 'imagekit'

export default defineEventHandler(async (event) => {

    const imagekit = new ImageKit({
        urlEndpoint: `https://ik.imagekit.io/${useRuntimeConfig().public.IMAGEKIT_PRIVATE_KEY}`,
        publicKey: useRuntimeConfig().public.IMAGEKIT_PUBLIC_KEY,
        privateKey: useRuntimeConfig().IMAGEKIT_PRIVATE_KEY
    });

    const { token, expire, signature } = imagekit.getAuthenticationParameters();

    if ( token && expire && signature ) {
        return { token, expire, signature, publicKey: useRuntimeConfig().public.IMAGEKIT_PUBLIC_KEY };
    } else {
        return { success: false }
    }


})
