# shell.nix
{ pkgs ? import <nixpkgs> {} }:

let
  nodejs = pkgs.nodejs_20;  # LTS version
in
pkgs.mkShell {
  buildInputs = with pkgs; [
    # Core development tools
    nodejs
    nodePackages.pnpm
    
    # Build essentials
    gcc
    gnumake

    # Version control
    git
  ];

  shellHook = ''
    echo "Node.js development environment loaded"
    echo "Node version: $(node --version)"
    echo "pnpm version: $(pnpm --version)"
  '';
}
