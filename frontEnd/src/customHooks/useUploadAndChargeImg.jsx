import { useState } from 'react'

function useUploadAndChargeImg() {
  const API_KEY_IMG_BB = import.meta.env.VITE_APIKEYIMGBB
  const [imgUrl, setImgUrl] = useState(null)

  const uploadImg = async (file) => {
    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${API_KEY_IMG_BB}`,
        {
          method: 'POST',
          body: formData
        }
      )

      if (response.ok) {
        const responseData = await response.json()
        if (responseData.data && responseData.data.url) {
          setImgUrl(responseData.data.url)
        } else {
          console.error('Error: Image URL not found in the response data')
        }
      } else {
        console.error(`Error: ${response.status} - ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error during image upload:', error)
    }
  }

  return { uploadImg, imgUrl }
}

export { useUploadAndChargeImg }
