// timestamp id=7 mar42023
let extensions = ['.txt', '.html', '.css', '.js', '.jpeg', '.jpg', '.png', '.gif', '']
  , icons = []
  , archivesExt = ['.zip']
  , files = []
  , archives = []
  , selectedfiles = []
  , iconrefs = {
    compressor: [],
    extractor: []
};
class Icon {
    constructor(name) {
        this.firstname = name;
        ['markup', 'event'].forEach(f=>this[f](name));
        this.name = name;
    }
    set selected(b) {
        let B = Boolean(eval(b));
        B ? selectedfiles.push(this) : delete selectedfiles.splice(selectedfiles.indexOf(this), 1);
        this.icon.setAttribute('selected', B);
    }
    get selected() {
        return Boolean(eval(this.icon.getAttribute('selected')))
    }
    markup(name) {
        (this.icon = make()).className = 'icon';
        this.icon.icon = this;
        [['loadingar'], ['selectar', 'input'], ['downloadar', 'input'], ['uploadar', 'input'], ['pausar', 'input'], ['beautifiar'], ['namar']].forEach(d=>{
            (this[d[0]] = make(d[1])).className = d[0];
            this.icon.appendChild(this[d[0]]);
        }
        );
        let inputshold = make();
        inputshold.className = 'inputshold';
        ['selectar', 'downloadar', 'uploadar', 'pausar'].forEach(i=>{
            inputshold.appendChild(this[i]);
        }
        );
        this.icon.insertBefore(inputshold, this.beautifiar);
        this.selectar.type = 'checkbox';
        ['download', 'upload', 'paus'].forEach(c=>{
            this[c + 'ar'].type = 'button'
        }
        )
        this.downloadar.value = '\\|/';
        this.pausar.value = '| |';
    }
    event() {
        this.selectar.addEventListener('change', ()=>this.selected = event.target.checked);
        this.icon.addEventListener('click', ()=>{
            let tar = event.target;
            switch (tar) {
            case this.uploadar:
                if (tar.value == '/|\\') {
                    tar.value = 'X';
                    tar.description = 'Delete ' + this.name;
                    this.upload()
                } else {
                    if (this.uploaded) {
                        confirm(()=>this.delete(), 'Are you sure you want to delete ' + this.name, 'YES')
                    } else {
                        tar.value = '/|\\';
                        this.stopupload();
                    }
                }
                ;break;
            case this.downloadar:
                this.download();
                break;
            case this.pausar:
                this.uploadpaused = tar.value == '| |';
                tar.value = tar.value == '| |' ? '|>' : '| |';
                break;
            }
        }
        )
        this.beautifiar.onmouseover = ()=>propertiesDiv.hidden = !(propertiesDiv.innerHTML = this.detailedHTML);
        this.beautifiar.onmouseout = ()=>propertiesDiv.hidden = 1;
    }
    set name(n) {
        n = '' + n;
        let s = n.split('.');
        this.extension = s.length > 1 ? '.' + s[s.length - 1] : '';
        this.firstname = n;
        this.downloadar.href = `../users/${user}/${this.name}`;
        this.downloadar.download = this.name;
        this.namar.textContent = this.firstname;
        //in tool bar there will be rename(another widget) for selected file(s);
    }
    get name() {
        return this.firstname;
    }
    show() {
        this.containingDiv = get(`main${this.for}sContainer`);
        this.containingDiv.appendChild(this.icon);
        //         this.containingDiv.scrollIntoView();
    }
    ;hide() {
        this.icon.remove();
    }

}
class FiLe extends Icon {
    constructor(name, obj, uploaded) {
        super(name);
        files.push(this);
        this.file = obj;
        this.manager = new XMLHttpRequest;
        this.downloadar.disabled = !(this.uploaded = Boolean(eval(uploaded)));
        this.loadpercent = 0;
        this.uploadar.value = this.uploaded ? 'X' : '/|\\';
        ;this.reader = new FileReader;
        //i'll use file.arrayBuffer though (or not)
        this.for = 'file';
        this.show();
        this.downloadar.description = 'Download ' + this.name;
        this.uploadar.description = `${this.uploaded ? 'Delete' : 'upload'} ${this.name}`;
        this.selectar.description = 'Select ' + this.name;
        this.pausar.description = 'Pause/resume upload of ' + this.name;
    }
    set loading(v) {
        this.loadingar.style.setProperty('--p', (this.loadpercent = v) + '%')
    }
    get loading() {
        return this.loadpercent
    }
    get hidden() {
        return !this.icon.parentElement
    }
    set hidden(v) {
        this[Boolean(eval(v)) ? 'show' : 'hide']()
    }
    openbinary() {
        new WinDow(this)
    }
    get detailedHTML() {
        return `
        <table>
        <tr><td>Name: </td><td>${this.name}</td></tr>
        <tr><td>Size: </td><td>${(this.file.size / 1024).toFixed(3)}kb</td></tr>
        <tr><td>Date Modified: </td><td>${this.file.lastModifiedDate}</td></tr>
        </table>
        `
    }
    get size() {
        let a = this.file.size;
        ['b', 'kb', 'mb', 'gb'].forEach(i=>{
            if (a > 500) {
                a /= 1024;
            } else {
                a = a.toFixed(2) + i;
                return a;
            }
        }
        )
    }
    upload() {
        if (this.uploaded || !this.file.arrayBuffer)
            return;
        this.uploading = true;
        alert('Upload Started');
        this.uploadar.disabled = true;
        let ff = new FormData;
        ff.append(this.name, this.file)
        let text = this.file.arrayBuffer()
        fetch(`/cgi-bin/uploadfiles.py`, {
            method: "POST",
            body: ff
        })
    }
    download(silent) {
        downloadbutton.href = `/users/${user}/${(downloadbutton.download = this.name)}`;
        if (silent) {
            downloadbutton.click();
        } else {
            confirm(()=>downloadbutton.click(), 'Download ' + this.name + '?', 'YES', 'NO')
        }
    }
    remove() {
        this.selected = false
        this.hide();
        for (let x in this) {
            delete this[x];
        }
        delete files.splice(files.indexOf(this), 1);
        if (archives.includes(this))
            archives.splice(archives.indexOf(this), 1)
        delete this;
    }
    delete(force, juststop) {
        this.loading = 30;
        this.manager.open('GET', `/cgi-bin/delete.py?path=${user}&filename=${this.name}`);
        this.manager.send();
        this.loading = 70;
        this.manager.onload = ()=>{
            this.loading = 100
            if (!force)
                alert(this.manager.response);
            juststop = this.manager.response.includes('failed');
            this.loading = 0;
            if (!juststop) {
                this.remove()
            }
            ;getDetailsBack();
        }
    }
    stopupload() {
        this.delete(true, true);
    }
    static getByName(nm) {
        files.filter(i=>i.name == nm)[0];
    }
}
class FileRef {
    constructor(name, to) {
        this.name = name;
        iconrefs[to].push(this);
        (this.iconref = make()).className = 'iconref';
        (this.selectref = make('input')).className = 'selectref';
        (this.namebar = make('span')).className = 'namebar';
        this.iconref.append(this.selectref, this.namebar);
        this.brackets = make('li');
        this.brackets.appendChild(this.iconref);
        this.to = to;
        (this.on = get(to).fileslist).appendChild(this.brackets);
        this.namebar.textContent = name;
        this.selectref.type = 'checkbox';
        this.selectref.checked = 1;
        this.brackets.obj = this;
    }
    remove() {
        this.brackets.querySelectorAll('*').forEach(i=>i.remove());
        this.brackets.remove();
        delete iconrefs[this.to].splice(iconrefs[this.to].indexOf(this), 1);
    }
    toJSON() {}
    ;
}
class Archive extends FiLe {
    constructor(name, obj, uploaded) {
        super(name, obj, uploaded)
        this.icon.classList.add('archive');
        this.for = 'archive';
        archives.push(this);
        this.show();
        this.files = this.file.files;
        this.mevent();
        if (this.uploaded)
            this.files.archive = this;
        this.tested = this.uploaded;
    }
    mevent() {
        this.beautifiar.ondblclick = ()=>{
            if (!this.uploaded)
                return alert('Not yet uploaded!')
            if (!this.tested)
                return alert('Testing archive, please wait')
            if (extdiv.open)
                return alert('Another Extraction is in progress!')
            showExtractor(this);
        }
    }
}