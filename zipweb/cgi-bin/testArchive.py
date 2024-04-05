from imp import *
folder = form.getfirst['username']
arcname = form['archive']
os.chdir(f'users/{folder}')
with open('details.json') as file: details=json.load(file);
if zipfile.is_zipfile(arcname):
    with Z(arcname) as arc: pass;
    details['archives'][arcname]['files'] = [{'name': f.filename, 'size': f.file_size, 'Date Modified': str(D(*f.date_time))} for f in arc.filelist]
    print('true')
else:
    details['files'][arcname] = details['archives'][arcname]
    del details['archives'][arcname]
    print('false')
with open('details.json', 'w') as file: json.dump(details, file);