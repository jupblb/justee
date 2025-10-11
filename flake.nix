{
  inputs = {
    nixpkgs.url     = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem(system:
      let
        pkgs    = nixpkgs.legacyPackages.${system};
        python3 = pkgs.python3.withPackages(ps: with ps; [ pyphen ]);
      in {
        devShells.default = pkgs.mkShell({
          buildInputs = with pkgs; [
            curl
            gnumake gnused
            nodejs
            pandoc pnpm pre-commit prettier pyright python3
            ruff
            typescript-language-server
            unzip
            vscode-css-languageserver
          ];
        });
      }
    );
}
