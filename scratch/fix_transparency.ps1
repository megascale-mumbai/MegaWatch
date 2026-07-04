Add-Type -AssemblyName System.Drawing

function Make-Transparent {
    param([string]$SourcePath)
    
    $bmp = [System.Drawing.Bitmap]::FromFile($SourcePath)
    $newBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height)
    $g = [System.Drawing.Graphics]::FromImage($newBmp)
    $g.DrawImage($bmp, 0, 0, $bmp.Width, $bmp.Height)
    $g.Dispose()
    
    # We'll treat very light or very dark pixels that look like background as transparent
    # Or specifically target the checkerboard colors if we can.
    # For now, let's target anything that isn't "silvery" (close to grey)
    # But simpler: make everything that is "white-ish" or "grey-ish" transparent at the edges.
    
    # Actually, let's just make the background (corners) transparent.
    $cornerColor = $newBmp.GetPixel(0, 0)
    
    for ($y = 0; $y -lt $newBmp.Height; $y++) {
        for ($x = 0; $x -lt $newBmp.Width; $x++) {
            $pixel = $newBmp.GetPixel($x, $y)
            
            # If it's the checkerboard color (usually light grey or white)
            # Or if it's very close to the corner color
            if ($pixel.R -gt 200 -and $pixel.G -gt 200 -and $pixel.B -gt 200) {
                 $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
            }
            # Also target the darker checkerboard square
            elseif ($pixel.R -gt 150 -and $pixel.R -lt 200 -and $pixel.G -gt 150 -and $pixel.G -lt 200 -and $pixel.B -gt 150 -and $pixel.B -lt 200) {
                 # Only if it's far from the center (heuristic for background)
                 $distX = [Math]::Abs($x - ($newBmp.Width / 2))
                 $distY = [Math]::Abs($y - ($newBmp.Height / 2))
                 if ($distX -gt ($newBmp.Width * 0.1) -or $distY -gt ($newBmp.Height * 0.1)) {
                     # This is risky, but let's try
                 }
            }
        }
    }
    
    $bmp.Dispose()
    $newBmp.Save($SourcePath, [System.Drawing.Imaging.ImageFormat]::Png)
    $newBmp.Dispose()
}

$paths = @(
    "d:\MegaWatch\megawatch\public\watches\ornate\hour.png",
    "d:\MegaWatch\megawatch\public\watches\ornate\minute.png",
    "d:\MegaWatch\megawatch\public\watches\ornate\second.png"
)

foreach ($p in $paths) {
    if (Test-Path $p) {
        Write-Host "Processing $p"
        Make-Transparent -SourcePath $p
    }
}
