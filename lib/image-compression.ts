"use client"

export async function compressImage(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        // Calculate new dimensions (max 1920px)
        let width = img.width
        let height = img.height
        const maxSize = 1920
        
        if (width > height && width > maxSize) {
          height = (height * maxSize) / width
          width = maxSize
        } else if (height > maxSize) {
          width = (width * maxSize) / height
          height = maxSize
        }
        
        canvas.width = width
        canvas.height = height
        ctx?.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              })
              resolve(compressedFile)
            } else {
              reject(new Error('Failed to compress image'))
            }
          },
          'image/jpeg',
          0.8
        )
      }
      img.onerror = () => reject(new Error('Failed to load image'))
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
  })
}

export async function uploadToSupabase(file: File, bucket: string, folder: string = ''): Promise<string> {
  try {
    const { supabase } = await import('./supabase')
    
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder ? folder + '/' : ''}${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    console.log(`Uploading to bucket: ${bucket}, file: ${fileName}`)
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      
      // Provide specific error messages
      if (error.message.includes('not found')) {
        throw new Error(
          `Storage bucket "${bucket}" not found.\n\n` +
          `Please create it manually:\n` +
          `1. Go to Supabase Dashboard → Storage\n` +
          `2. Click "New bucket"\n` +
          `3. Name: "${bucket}"\n` +
          `4. Make it Public\n` +
          `5. Click "Create bucket"`
        )
      }
      
      throw new Error(`Upload failed: ${error.message}`)
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)

    console.log('Upload successful:', publicUrl)
    return publicUrl
  } catch (error) {
    console.error('Upload to Supabase failed:', error)
    throw error
  }
}
