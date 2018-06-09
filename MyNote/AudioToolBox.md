## AudioToolBox
### 1. AudioFile
#### 1.1 简介
##### AudioFile 可以对Audio文件进行操作，可以读/写多种格式的音频数据到内存或者硬盘。简单的说。具体操作函数如下：

* create(创建)、初始化(initialize)、打开(open)、关闭(close)音频文件。

* 读(Read)、写(Write)音频文件。

* 优化(Optimize)音频文件。

#### 1.2 函数讲解
##### 1.2.1 创建文件
```
OSStatus AudioFileCreateWithURL (CFURLRef inFileRef,
                          AudioFileTypeID inFileType,
        const AudioStreamBasicDescription *inFormat,
                           AudioFileFlags inFlags,
     AudioFileID	__nullable * __nonnull	outAudioFile)
     
inFileRef:目地路径
inFileType:创建音频文件的格式
	CF_ENUM(AudioFileTypeID) {
        kAudioFileAIFFType				= 'AIFF',
        kAudioFileAIFCType				= 'AIFC',
        kAudioFileWAVEType				= 'WAVE',
        kAudioFileRF64Type              = 'RF64',
        kAudioFileSoundDesigner2Type	= 'Sd2f',
        kAudioFileNextType				= 'NeXT',
        kAudioFileMP3Type				= 'MPG3',	// mpeg layer 3
        kAudioFileMP2Type				= 'MPG2',	// mpeg layer 2
        kAudioFileMP1Type				= 'MPG1',	// mpeg layer 1
		kAudioFileAC3Type				= 'ac-3',
        kAudioFileAAC_ADTSType			= 'adts',
        kAudioFileMPEG4Type             = 'mp4f',
        kAudioFileM4AType               = 'm4af',
        kAudioFileM4BType               = 'm4bf',
		kAudioFileCAFType				= 'caff',
		kAudioFile3GPType				= '3gpp',
		kAudioFile3GP2Type				= '3gp2',		
		kAudioFileAMRType				= 'amrf',
		kAudioFileFLACType				= 'flac'
	}  	
inFormat:这个文件的更多详细的信息
	struct AudioStreamBasicDescription{
	    Float64             mSampleRate;
	    AudioFormatID       mFormatID;
	    AudioFormatFlags    mFormatFlags;
	    UInt32              mBytesPerPacket;
	    UInt32              mFramesPerPacket;
	    UInt32              mBytesPerFrame;
	    UInt32              mChannelsPerFrame;
	    UInt32              mBitsPerChannel;
	    UInt32              mReserved;
	};
inFlags:文件创建还是打开
   kAudioFileFlags_EraseFiles：将会移除一个已经存在的文件，然后重新创建；
   如果没有设置的话，如果url出已经有文件，就会返回失败 ）
   默认是：kAudioFileFlags_EraseFiles。
	typedef CF_OPTIONS(UInt32, AudioFileFlags) {
		kAudioFileFlags_EraseFile = 1,
		kAudioFileFlags_DontPageAlignAudioData = 2
	}
outAudioFile:音频文件句柄，音频文件或者音频流唯一标识。
```

##### 1.2.2 初始化
```
OSStatus AudioFileInitializeWithCallbacks (
					             void * inClientData, 
				    AudioFile_ReadProc inReadFunc, 
				   AudioFile_WriteProc inWriteFunc, 
				 AudioFile_GetSizeProc inGetSizeFunc,
				 AudioFile_SetSizeProc inSetSizeFunc,
				       AudioFileTypeID inFileType,
	 const AudioStreamBasicDescription *inFormat,
	                    AudioFileFlags inFlags,
	 AudioFileID __nullable *__nonnull outAudioFile)
	 
inClientData：回调函数所需要的数据，应该包含回调函数所有想要知道的内容
inReadFunc:读回调
inWriteFunc:写回调
inGetSizeFunc:获取文件大小的回调
inSetSizeFunc:设置文件大小的回调
inFileType:音频文件被初始化的格式。
inFileType:这个文件中的音频文件的格式
inFlags:是创建还是打开一个文件，通常设置为0
outAudioFile:指向刚刚被初始化的文件的句柄

读回调:
typedef OSStatus (*AudioFile_ReadProc)(
								void *		inClientData,
								SInt64		inPosition, 
								UInt32		requestCount,
								void *		buffer, 
								UInt32 *	actualCount);
写回调:							
typedef OSStatus (*AudioFile_WriteProc)(
								void * 		inClientData,
								SInt64		inPosition, 
								UInt32		requestCount, 
								const void *buffer, 
								UInt32    * actualCount);
获取文件大小的回调:
typedef SInt64 (*AudioFile_GetSizeProc)(
								void * 		inClientData);
设置文件大小的回调：
typedef OSStatus (*AudioFile_SetSizeProc)(
								void *		inClientData,
								SInt64		inSize);	
```

##### 1.2.3 打开文件
```
OSStatus AudioFileOpenURL (   
							   CFURLRef inFileRef,
		          AudioFilePermissions inPermissions,
		               AudioFileTypeID inFileTypeHint,
	AudioFileID __nullable * __nonnull outAudioFile)

inFileRef:已经存在的音频文件的路径。
inPermissions:音频文件的读写属性，分为只读、只写、读写三种。
	typedef CF_ENUM(SInt8, AudioFilePermissions) {
		kAudioFileReadPermission      = 0x01,
		kAudioFileWritePermission     = 0x02,
		kAudioFileReadWritePermission = 0x03
	};
inFileTypeHint:指定类型的音频文件的隐含的文件类型，特别是一些文件类型不容易判断的类型（如ADT或者AC3）。
outAudioFile：只想这个新打开的文件句柄的指针。
```
```
OSStatus AudioFileOpenWithCallbacks (
		                          void * inClientData,
		              AudioFile_ReadProc inReadFunc,
		  AudioFile_WriteProc __nullable inWriteFunc,
		           AudioFile_GetSizeProc inGetSizeFunc,
		AudioFile_SetSizeProc __nullable inSetSizeFunc,
                         AudioFileTypeID inFileTypeHint,
      AudioFileID __nullable * __nonnull outAudioFile)
      
inClientData:内存中的一块音频数据。
inReadFunc:读回调
inWriteFunc:写回调
inGetSizeFunc:获取文件大小的回调
inSetSizeFunc:设置文件大小的回调
inFileType:音频文件被初始化的格式。
inFileType:这个文件中的音频文件的格式
```

##### 1.2.4 关闭文件
```
OSStatus AudioFileClose (
   AudioFileID inAudioFile
);
```

##### 1.2.5 获取文件属性
```
OSStatus AudioFileGetProperty (
		           AudioFileID inAudioFile,
		   AudioFilePropertyID inPropertyID,
		              UInt32 * ioDataSize,
		                void * outPropertyData
);

inAudioFile:音频文件句柄。在调用AuidioFileOpenURL后获得。
inPropertyID:属性类别，常用的音频数据格式：kAudioFilePropertyDataFormat，
             这个类型决定了后面参数的解析方式。
    CF_ENUM(AudioFilePropertyID)
	{
		kAudioFilePropertyFileFormat			=	'ffmt',
		kAudioFilePropertyDataFormat			=	'dfmt',
		kAudioFilePropertyIsOptimized			=	'optm',
		kAudioFilePropertyMagicCookieData		=	'mgic',
		kAudioFilePropertyAudioDataByteCount	=	'bcnt',
		kAudioFilePropertyAudioDataPacketCount	=	'pcnt',
		kAudioFilePropertyMaximumPacketSize		=	'psze',
		kAudioFilePropertyDataOffset			=	'doff',
		kAudioFilePropertyChannelLayout			=	'cmap',
		kAudioFilePropertyDeferSizeUpdates		=	'dszu',
		kAudioFilePropertyDataFormatName		=	'fnme',
		kAudioFilePropertyMarkerList			=	'mkls',
		kAudioFilePropertyRegionList			=	'rgls',
		kAudioFilePropertyPacketToFrame			=	'pkfr',
		kAudioFilePropertyFrameToPacket			=	'frpk',
		kAudioFilePropertyPacketToByte			=	'pkby',
		kAudioFilePropertyByteToPacket			=	'bypk',
		kAudioFilePropertyChunkIDs				=	'chid',
		kAudioFilePropertyInfoDictionary        =	'info',
		kAudioFilePropertyPacketTableInfo		=	'pnfo',
		kAudioFilePropertyFormatList			=	'flst',
		kAudioFilePropertyPacketSizeUpperBound  =	'pkub',
		kAudioFilePropertyReserveDuration		=	'rsrv',
		kAudioFilePropertyEstimatedDuration		=	'edur',
		kAudioFilePropertyBitRate				=	'brat',
		kAudioFilePropertyID3Tag				=	'id3t',
		kAudioFilePropertySourceBitDepth		=	'sbtd',
		kAudioFilePropertyAlbumArtwork			=	'aart',
	    kAudioFilePropertyAudioTrackCount       =   'atct',
		kAudioFilePropertyUseAudioTrack			=	'uatk'
	}

ioDataSize:outPropertyData的大小,sizeof(outPropertyData)。
		   需要使用AudioFileGetPropertyInfo函数来获取该属性的值，这点需要注意。
outPropertyData:inPropertyID属性的值。
```

##### 1.2.6 获取音频文件属性信息
###### 获取音频文件属性的信息，包括音频文件属性的大小以及这个属性只是否可写。
```
OSStatus AudioFileGetPropertyInfo (
           AudioFileID inAudioFile,
   AudioFilePropertyID inPropertyID,
              UInt32 * outDataSize,
              UInt32 * isWritable
);

inAudioFile:音频文件id。
inPropertyID:属性类型ID。
outDataSize:属性值的字节数。
isWritable: 0：仅可写
            1：仅可读
```

### 2. AudioQueue
#### 2.1 简介
##### AudioQueue，是一个可以录制和播放音频的对象，AudioQueue负责以下几方面的工作：
* 连接音频硬件。
* 管理内存。
* 对需要解码的音频文件进行解码。
* 调节(mediating)回放或录音的效果。

##### 有了AudioQueue，可以播放 linear PCM文件、部分压缩文件（如aac等）、其他格式用户有解码器的文件；它还支持多个audioQueue的混合回放以及音频和视频的同步等。
##### 具体的API:
* AudioQueueStart
* AudioQueuePrime
* AudioQueueFlush 
* AudioQueueStop
* AudioQueuePause
* AudioQueueReset

#### 2.2 函数讲解
##### 2.2.1 开始播放
```
OSStatus AudioQueueStart (
            AudioQueueRef inAQ,
   const AudioTimeStamp * inStartTime
);

inAQ:音频队列
inStartTime:音频队列开始的时间。
	如果需要指定一个时间，要根据AudioTimeStamp创建一个结构。
	如果这个参数传NULL，表明这个audioQueue队列应该尽快开启。
	struct AudioTimeStamp
	{
	    Float64             mSampleTime;
	    UInt64              mHostTime;
	    Float64             mRateScalar;
	    UInt64              mWordClockTime;
	    SMPTETime           mSMPTETime;
	    AudioTimeStampFlags mFlags;
	    UInt32              mReserved;
	};
```

##### 2.2.2 缓冲解码
###### 对已经进入AudioQueue中的缓冲进行解码，为回放做准备。
```
 OSStatus AudioQueuePrime (
	   AudioQueueRef inAQ,
	          UInt32 inNumberOfFramesToPrepare,
	          UInt32 *outNumberOfFramesPrepared
);

inAQ:音频队列
inNumberOfFramesToPrepare:这个函数返回之前，需要解码的frames数。
outNumberOfFramesToPrepare:函数返回前实际解码的个数，
						   如果不想关注这个信息，这个参数传入NULL就行。
```

##### 2.2.3 重置解码器解码状态
###### 为了使所有进入audioQueue的数据都被处理，在最后一个音频缓冲进入音频队列后，调用这个函数可以使即将结束的audioQueue不会影响到后面的audioQueue。在AudioQueueStop之前调用AudioQueueFlush可以确保所有进入队列的数据都被处理。
```
OSStatus AudioQueueFlush (
   AudioQueueRef inAQ
);

inAQ:音频队列
```

##### 2.2.4 停止播放或者录音
```
OSStatus AudioQueueStop (
   AudioQueueRef inAQ,
         Boolean inImmediate
);

inAQ:音频队列
inImmediate:   true:stop马上进行，即是同步进行的。
			  flase:异步进行的，函数先返回，但是音频队列直到队列中所有的的数据
			        被录制或者回放完成才真正结束。
```

##### 2.2.5 暂停播放或者录制
###### 对一个音频队列调用暂停，不会影响队列中已经有的buffers、也不会reset（重置）这个音频队列。如果要恢复播放或者录制，只需要调用：AudioQueueStart.
```
OSStatus AudioQueuePause (
   AudioQueueRef inAQ
);

inAQ:音频队列
```

##### 2.2.6 重置音频队列
###### 立马初始化一个音频队列，将队列中已有的buffers数据清空、重置解码器和数字化信息等
```
OSStatus AudioQueueReset (
   AudioQueueRef inAQ
);

inAQ:音频队列
```

##### 2.2.7 创建播放音频队列
```
 OSStatus AudioQueueNewOutput (
   const AudioStreamBasicDescription * inFormat,
              AudioQueueOutputCallback inCallbackProc,
                                void * inUserData,
                          CFRunLoopRef inCallbackRunLoop,
                           CFStringRef inCallbackRunLoopMode,
                                UInt32 inFlags,
                       AudioQueueRef * outAQ
);

inFormat:基本的流信息。
         已经存在的流数据，通过AudioFileGetProperty的方法获取
         属性ID：kAudioFilePropertyDataFormat
         
inCallbackProc:音频队列输出（播放）时的回调函数。
	typedef void (*AudioQueueOutputCallback)(
            void * __nullable       inUserData,
            AudioQueueRef           inAQ,
            AudioQueueBufferRef     inBuffer);
            
inUserData:用户自定义参数，可以传递到回调中。

inCallbackRunLoop:指定回调函数执行的事件循环。
   一般使用：CFRunLoopGetCurrent()，
   当设置为NULL时，这个时间循环插入到其中一个音频队列的内部线程中。
   
inCallbackRunLoopMode:回调函数执行时的模式，
	通常设置为：kCFRunLoopCommonModes
	
inFlags:保留参数，必须设置为0.

outAQ:新创建的音频队列对象。

```

##### 2.2.8 创建录音音频队列
```
OSStatus AudioQueueNewInput(                 
     const AudioStreamBasicDescription * inFormat,
                 AudioQueueInputCallback inCallbackProc,
                       void * __nullable inUserData,
                 CFRunLoopRef __nullable inCallbackRunLoop,
                  CFStringRef __nullable inCallbackRunLoopMode,
                                  UInt32 inFlags,
    AudioQueueRef __nullable * __nonnull outAQ)
    
inFormat:基本的流信息。
         已经存在的流数据，通过AudioFileGetProperty的方法获取
         属性ID：kAudioFilePropertyDataFormat
         
inCallbackProc:音频队列输出（播放）时的回调函数。
	typedef void (*AudioQueueInputCallback)(
		 void * __nullable               inUserData,
		 AudioQueueRef                   inAQ,
		 AudioQueueBufferRef             inBuffer,
		 const AudioTimeStamp *          inStartTime,
		 UInt32                          inNumberPacketDescriptions,
		 const AudioStreamPacketDescription * __nullable inPacketDescs)
            
inUserData:用户自定义参数，可以传递到回调中。

inCallbackRunLoop:指定回调函数执行的事件循环。
   一般使用：CFRunLoopGetCurrent()，
   当设置为NULL时，这个时间循环插入到其中一个音频队列的内部线程中。
   
inCallbackRunLoopMode:回调函数执行时的模式，
	通常设置为：kCFRunLoopCommonModes
	
inFlags:保留参数，必须设置为0.

outAQ:新创建的音频队列对象。

```

##### 2.2.8 销毁（处理）音频队列
```
 OSStatus AudioQueueDispose (
   AudioQueueRef inAQ,
   Boolean inImmediate
);

inAQ:音频队列。
inImmdiate:是否马上销毁音频队列。
```

##### 2.2.9 分配音频队列缓存
```
OSStatus AudioQueueAllocateBuffer (
   AudioQueueRef inAQ,
   UInt32 inBufferByteSize,
   AudioQueueBufferRef *outBuffer
);

inAQ:音频队列.
inBufferByteSize:想要分配的缓冲区的大小，字节表示。
	
outBuffer:指向新分配的这个音频队列缓存的指针。
	typedef struct AudioQueueBuffer {
	    const UInt32                    mAudioDataBytesCapacity;
	    void * const                    mAudioData;
	    UInt32                          mAudioDataByteSize;
	    void * __nullable               mUserData;
	
	    const UInt32                    mPacketDescriptionCapacity;
	    AudioStreamPacketDescription * const __nullable mPacketDescriptions;
	    UInt32                          mPacketDescriptionCount;
	} AudioQueueBuffer;
```

##### 2.2.10 录音或者回放音缓存中添加数据
```
OSStatus AudioQueueEnqueueBuffer (
   AudioQueueRef                      inAQ,
   AudioQueueBufferRef                inBuffer,
   UInt32                             inNumPacketDescs,
   const AudioStreamPacketDescription *inPacketDescs
);

inAQ:音频队列。
inBuffer:将要被加进缓存队列的音频队列缓存。（感觉很拗口）
inNumPacketDescs:inBuffer中音频数据包的个数。在以下三种情况下，这个值应该设为0：
 * 播放的音频有固定的bit速率。
 * 音频队列是录音队列时
 * 当这个缓存是由AudioQueueAllocateBufferWithPacketDescription分配，
   并重新如队列时。（不明白继续往后研究）
```

##### 2.2.11 获取音频队列的属性
###### 在使用这个函数前，可以先使用AudioQueueGetPropertySize函数来获取，存储对应属性值所需的大小。
```
OSStatus AudioQueueGetProperty (
   AudioQueueRef        inAQ,
   AudioQueuePropertyID inID,
   void                *outData,
   UInt32              *ioDataSize
);

inAQ:音频队列。
inID:属性类型ID。
outData:属性值。
oDataSize: 输入时:调用者所期望的最大的字节数
           返回时:该属性值的实际数据大小
```

##### 2.2.12 设置音频队列属性
```
OSStatus AudioQueueSetProperty (
   AudioQueueRef        inAQ,
   AudioQueuePropertyID inID,
   const void          *inData,
   UInt32               inDataSize
); 

inAQ:音频队列。
inID:属性类型ID。
inData:属性的实际值。
inDataSize:属性值数据的大小。
```
##### 2.2.13 离屏渲染
###### 使用一个音频播放队列的音频数据，将这些数据抽取到一个缓冲区中，而不是进行播放。
```
OSStatus AudioQueueOfflineRender (
   AudioQueueRef         inAQ,
   const AudioTimeStamp *inTimestamp,
   AudioQueueBufferRef   ioBuffer,
   UInt32                inNumberFrames
);

inAQ:音频回放队列。
inTimestamp:相对于当前音频队列开始位置的时间戳。
ioBuffer:  输入:音频队列所提供的，供渲染的音频数据。
           输出:被渲染过的音频数据，这些数据可以直接被写入文件中。
inNumberFrames:需要渲染的音频数据的帧个数。
```