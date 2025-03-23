import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import crypto from 'crypto-js';

const CACHE_DIRECTORY = Platform.OS === 'ios' 
  ? `${RNFS.CachesDirectoryPath}/video-cache`
  : `${RNFS.CachesDirectoryPath}/video-cache`;

class VideoCache {
  static async initialize() {
    const exists = await RNFS.exists(CACHE_DIRECTORY);
    if (!exists) {
      await RNFS.mkdir(CACHE_DIRECTORY);
    }
  }

  static getFileNameFromUrl(url) {
    return crypto.MD5(url).toString() + '.mp4';
  }

  static getCacheFilePath(url) {
    const fileName = this.getFileNameFromUrl(url);
    return `${CACHE_DIRECTORY}/${fileName}`;
  }

  static async isCached(url) {
    const filePath = this.getCacheFilePath(url);
    return await RNFS.exists(filePath);
  }

  static async cacheVideo(url) {
    try {
      const filePath = this.getCacheFilePath(url);
      const exists = await this.isCached(url);

      if (exists) {
        return filePath;
      }

      // Download the video
      await RNFS.downloadFile({
        fromUrl: url,
        toFile: filePath,
        background: true,
        discretionary: true,
        progress: (res) => {
          const progress = (res.bytesWritten / res.contentLength) * 100;
        },
      }).promise;

      return filePath;
    } catch{
      console.error('Error caching video:', error);
      return url; 
    }
  }

  static async getCachedVideoPath(url) {
    try {
      const isCached = await this.isCached(url);
      if (isCached) {
        return this.getCacheFilePath(url);
      }
      return await this.cacheVideo(url);
    } catch{
      console.error('Error getting cached video:', error);
      return url; 
    }
  }

  static async clearCache() {
    try {
      const files = await RNFS.readDir(CACHE_DIRECTORY);
      await Promise.all(
        files.map(file => RNFS.unlink(file.path))
      );
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
}

export default VideoCache;