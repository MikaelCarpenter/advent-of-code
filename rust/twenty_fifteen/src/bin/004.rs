use md5;
use std::fmt;

fn main() {
    println!("5 zeroes input: {}", find_hash_input(5, 1_000_000));
    println!("6 zeroes input: {}", find_hash_input(6, 10_000_000));
}

struct FindHashInputResult {
    final_hash: String,
    lowest_number_input: i32,
}

impl fmt::Display for FindHashInputResult {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}, {}", self.final_hash, self.lowest_number_input)
    }
}

fn find_hash_input(sig_digits: usize, max_tries: usize) -> FindHashInputResult {
    let mut number_input = 0;
    let mut final_hash = String::new();
    let mut lowest_number_input: Option<i32> = None;

    while lowest_number_input.is_none() {
        let hash = format!("{:x}", md5::compute(format!("iwrupvqb{}", number_input)));

        if number_input % 100_000 == 0 {
            println!("We've reached: {}, {}, {}", number_input, hash, sig_digits);
        }

        if &hash[0..sig_digits] == "0".repeat(sig_digits) {
            final_hash = hash;
            lowest_number_input = Some(number_input);
        } else if max_tries > i32::MAX as usize || number_input >= max_tries as i32 {
            println!("Exceeded max tries");
            lowest_number_input = Some(-1);
        } else {
            number_input += 1;
        }
    }

    return FindHashInputResult {
        final_hash,
        lowest_number_input: lowest_number_input.unwrap(),
    };
}
