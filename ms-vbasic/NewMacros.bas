Attribute VB_Name = "NewMacros"
Sub Macro1()
Attribute Macro1.VB_ProcData.VB_Invoke_Func = "Normal.NewMacros.Macro1"
'
' Macro1 Macro
'
'
    Selection.InlineShapes.AddPicture FileName:= _
        "C:\Users\ENESIO~1\AppData\Local\Temp\524713B.tmp", LinkToFile:=False, _
        SaveWithDocument:=True
    Selection.MoveDown Unit:=wdLine, Count:=1
    Selection.InlineShapes.AddPicture FileName:= _
        "C:\Program Files (x86)\Microsoft Office\MEDIA\CAGCAT10\j0090386.wmf", _
        LinkToFile:=False, SaveWithDocument:=True
End Sub
