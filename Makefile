PROJECTS := typescript rust
SOURCE_DIR := inputs

.PHONY: sync
sync: $(PROJECTS)

.PHONY: $(PROJECTS)
$(PROJECTS):
	@echo "Syncing inputs to $@..."
	@mkdir -p $@/inputs
	@rsync -av --delete $(SOURCE_DIR)/ $@/inputs/ || cp -R $(SOURCE_DIR)/* $@/inputs/

.PHONY: clean
clean:
	@for proj in $(PROJECTS); do \
		rm -rf $$proj/inputs; \
	done
	@echo "Cleaned all input directories"

.PHONY: rs
rs:
	@if [ -z "$(problem)" ]; then \
		echo "Usage: make rs problem=005"; \
		exit 1; \
	fi
	@echo "Running Rust solution $(problem)..."
	@cd rust/twenty_fifteen && cargo run --bin $(problem) -q
	