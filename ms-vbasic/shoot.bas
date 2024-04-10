Attribute VB_Name = "Module1"
Sub Auto_Open()
Attribute Auto_Open.VB_ProcData.VB_Invoke_Func = "A\n14"
'
' Auto_Open Macro
'
' Keyboard Shortcut: Ctrl+Shift+A
'
 
Application.DisplayFullScreen = True
M = MsgBox("Input the square/squareroot of any number displayed", vbOKOnly, "SQUARERUNT")
N% = 19
R% = 19
J% = 0
K% = 0
G% = InputBox("Start values from", "Value range", 1)
H% = InputBox(" End values at", "Value range", 10)
Do While N% > 0 Or R% > 0
D% = Int((2 * Rnd) + 1)
V% = Int((H% - G% + 1) * Rnd + G%)
ActiveWindow.SmallScroll Down:=0
 If D% = 1 Then
 A% = InputBox("INPUT THE SQUAREROOT OF THE SELECTED NUMBER", "SQUARERUNT", V% ^ 2)
    If A% = V% Then
    N% = N% - 1
    ActiveSheet.Shapes.Range(Array("Up Arrow Callout 6")).IncrementLeft 50
    J% = J% + 50
    Else
    R% = R% - 1
    M = MsgBox("WRONG, TRY AGAIN", vbAbortRetryIgnore, "SQUARERUNT")
    ActiveSheet.Shapes.Range(Array("Up Arrow Callout 4")).IncrementLeft 50
    K% = K% + 50
    End If
Else
    A% = InputBox("INPUT THE SQUARE OF THE SELECTED NUMBER", "SQUARERUNT", V%)
    If A% = V% ^ 2 Then
    N% = N% - 1
    ActiveSheet.Shapes.Range(Array("Up Arrow Callout 6")).IncrementLeft 50
    J% = J% + 50
    Else
    R% = R% - 1
    M = MsgBox("WRONG, TRY AGAIN", vbAbortRetryIgnore, "SQUARERUNT")
    ActiveSheet.Shapes.Range(Array("Up Arrow Callout 4")).IncrementLeft 50
    K% = K% + 50
    End If
End If

If N% = 0 Then Exit Do
If R% = 0 Then Exit Do
Loop

If N% = 0 Then MsgBox "YOU WIN", , "SQUARERUNT" Else MsgBox "YOU LOSE", , "SQUARERUNT"
ActiveSheet.Shapes.Range(Array("Up Arrow Callout 4")).IncrementLeft -K%
ActiveSheet.Shapes.Range(Array("Up Arrow Callout 6")).IncrementLeft -J%
End Sub
Sub Macro3()
'
' Macro3 Macro
'
' Keyboard Shortcut: Ctrl+Shift+Z
'
    N% = 900
Do While N% > 0
    N% = N% - 1
    Selection.ShapeRange.IncrementLeft -1
Loop
End Sub

Sub testing()
Attribute testing.VB_ProcData.VB_Invoke_Func = "T\n14"
'
' testing Macro
'
' Keyboard Shortcut: Ctrl+Shift+T
'
    ActiveSheet.Shapes.Range(Array("Up Arrow Callout 4")).Select
    X% = 700
    ActiveWindow.SmallScroll Down:=-3
    Do While X% > 0
    X% = X% - 1
    Selection.ShapeRange.IncrementLeft 1
    Loop
End Sub
