"""#Algorithm
first open the file (to be compressed) in binary mode,
 then use zlib.compress(level=specifiedbyuser/default) to compress it, 
then write the compressed bytes to another
 file created with the same name in another folder or with another extension (.txt can be ._txt)
Use a class that will inherit from zipfile.ZipFile: import zipfile; ZipFile = zipfile.ZipFile;
"""
"""March 5 2023: afternoon
maybe I will do that when it is compressing, it will check if the compressed will be less than the
normal file, if it is less, I will compress else I will not.
During decompression of zip files, I will check if the file can be decompressed by using a try: block
....

add extract here, and extract elsewhere options to tools tab in zipweb
"""
import zlib, zipfile, os
ZF = zipfile.ZipFile
class DanZip():
    def __init__(self, level=-1):
        self.level = level
    def __repr__(self):
        return 'DanZip Object'
    def normalize(self, filename):
        with open(filename, 'rb') as file:
            fr = file.read()
            try:
                dfr = zlib.decompress(fr);
            except BaseException:
                dfr = fr
            file.close()
            with open(''): pass
    def compress(self, data):
        cdata = zlib.compress(data, self.level)
        return cdata if len(cdata)<len(data) else data
    def create(self, filename):
        with ZF(filename, 'x'):pass
        with open(filename, 'rb') as file:
            fr = file.read()
            cfr = zlib.compress(fr, self.level)
            newfilename = filename+'.dZip';
            with open(newfilename, 'wb') as innerFile: innerFile.write(cfr if len(cfr)<len(fr) else fr)
            file.close()
            os.remove(filename)
    def add(self, filename, archivename):
        pass
    def open(self, filename):
        with open(filename, 'rb') as file:
            fr = file.read()
            try:
                dfr = zlib.decompress(fr)
                if len(dfr)>=len(fr):
                    dfr = fr
            except BaseException:
                dfr = fr;
            del fr
             
                        
    def write(self, filename, to):
        a
        
