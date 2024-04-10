Attribute VB_Name = "NewMacros"
Sub Macro1()
Attribute Macro1.VB_ProcData.VB_Invoke_Func = "Normal.NewMacros.Macro1"
'
' Macro1 Macro
'
'
    Selection.InlineShapes.AddPicture FileName:= _
        "C:\Users\Enesi Ogirimah Dan\Pictures\Hamilton.jpg", LinkToFile:=False, _
        SaveWithDocument:=True
    Selection.MoveDown Unit:=wdLine, Count:=1
End Sub
