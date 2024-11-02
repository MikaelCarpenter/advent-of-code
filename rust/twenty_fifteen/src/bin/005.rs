use std::collections::HashMap;

const INPUT: &str = include_str!("./inputs/005.input.txt");

fn main() {
    println!("Nice string v1: {}", get_nice_string_count(is_nice_string));
    println!(
        "Nice string v2: {}",
        get_nice_string_count(is_nice_string_v2)
    );
}

fn is_nice_string(string: &str) -> bool {
    let mut vowel_count = 0;
    let mut double_letter_found = false;
    let mut naughty_sequence_found = false;

    let mut prev_char = None;

    for char in string.chars() {
        if matches!(char, 'a' | 'i' | 'o' | 'u' | 'e') {
            vowel_count += 1;
        }
        if let Some(prev) = prev_char {
            if matches!(
                (prev, char),
                ('a', 'b') | ('c', 'd') | ('p', 'q') | ('x', 'y')
            ) {
                naughty_sequence_found = true;
            }
            if prev == char {
                double_letter_found = true;
            }
        }

        prev_char = Some(char);
    }

    return vowel_count >= 3 && double_letter_found && !naughty_sequence_found;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_is_nice_string() {
        assert_eq!(is_nice_string("ugknbfddgicrmopn"), true);
        assert_eq!(is_nice_string("aaa"), true);
        assert_eq!(is_nice_string("jchzalrnumimnmhp"), false);
        assert_eq!(is_nice_string("haegwjzuvuyypxyu"), false);
        assert_eq!(is_nice_string("dvszwmarrgswjxmb"), false);
    }
}

fn get_nice_string_count(test_fxn: impl Fn(&str) -> bool) -> usize {
    let count = INPUT.lines().filter(|line| test_fxn(line)).count();

    return count;
}

fn is_nice_string_v2(string: &str) -> bool {
    let mut repeat_with_gap_found = false;
    let mut non_overlapping_pairs_found = false;
    let mut prev_pair = String::new();

    let mut pairs: HashMap<String, bool> = HashMap::new();

    let chars: Vec<char> = string.chars().collect();

    for i in 0..chars.len() {
        let current_char = chars[i];
        let next_char = chars.get(i + 1).cloned().unwrap_or('\0');
        let potential_repeat = chars.get(i + 2).cloned().unwrap_or('\0');
        let pair = format!("{}{}", current_char, next_char);

        if current_char == potential_repeat && current_char != next_char {
            repeat_with_gap_found = true;
        }
        if pair != prev_pair && pairs.contains_key(&pair) {
            non_overlapping_pairs_found = true;
        }

        pairs.insert(pair.clone(), true);
        prev_pair = pair;
    }

    return repeat_with_gap_found && non_overlapping_pairs_found;
}
