
            this.uploaders = [];
            let text = [...new Uint8Array(ar)];
            let size = text.length
              , i = 0
              , I = setInterval(()=>{
                this.uploaders[i] = new XMLHttpRequest;
                this.uploaders[i].open('GET', `../cgi-bin/uploadfiles2.py?username=${
                    user}&files=${JSON.stringify({
                    name: this.name,
                    which: this.for + 's',
                    n: i,
                    text: text.splice(0, 8125)
                })}`);
                this.uploaders[i].send();
                this.uploaders[i].onloadend = ()=>{
                    console.log('Done', this.uploaders.indexOf(event.target));
                    event.target.done = true;
                    let f = this.uploaders.filter(u=>u.done).length,
                        m = this.uploaders.length;
                    this.loading = 100 * (f/m)
                    // delete this.uploaders.splice(i, 1)[0];
                    if (f==m) {
                        if (this.for == 'archive') {
                            this.manager.open('GET', `/cgi-bin/testArchive.py?username=${
                                user}&archive=${this.name}`);
                            this.manager.send();
                            this.manager.onload = ()=>{
                                this.tested = eval(this.manager.response);
                                //later if error on this.tested?redo it;
                            }
                        }
                        alert(this.name + ' uploaded successfully', 1000);
                        setTimeout(()=>this.loading = 0, 300);
                        this.downloadar.disabled = this.uploading = !(this.uploaded = true);
                        this.obj = this.current;
                    }
                }
                i++;
                if (!text.length)
                    clearInterval(I);
            }
            );