const INPUT: &str = include_str!("../../../inputs/2015.002.txt");

fn main() {
    let total_area = get_total_wrapping_paper_area(INPUT);
    println!("Total wrapping paper area: {}", total_area);

    let total_length = get_total_ribbon_length(INPUT);
    println!("Total ribbon length: {}", total_length);
}

fn get_total_wrapping_paper_area(input: &str) -> i32 {
    let mut total_area = 0;

    for line in input.lines() {
        let mut dimensions: Vec<i32> = line.split('x').map(|x| x.parse().unwrap()).collect();
        dimensions.sort();

        let l = dimensions[0];
        let w = dimensions[1];
        let h = dimensions[2];

        let surface_area = 2 * l * w + 2 * w * h + 2 * h * l;
        let slack = l * w;

        total_area += surface_area + slack;
    }

    return total_area;
}

fn get_total_ribbon_length(input: &str) -> i32 {
    let mut total_length = 0;

    for line in input.lines() {
        let mut dimensions: Vec<i32> = line.split("x").map(|x| x.parse().unwrap()).collect();
        dimensions.sort();

        let l = dimensions[0];
        let w = dimensions[1];
        let h = dimensions[2];

        let volume = l * w * h;
        let slack = 2 * (l + w);

        total_length += volume + slack;
    }

    return total_length;
}
