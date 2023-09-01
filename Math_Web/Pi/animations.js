//for polygonial patterns
a = [q];
for (let i = 1; i < n; i++) {
    a[i] = new Polygon(svg, a[i-1].midPoints);
}