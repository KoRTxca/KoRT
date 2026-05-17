import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

void main() => runApp(const KoRTxApp());

class KoRTxApp extends StatelessWidget {
  const KoRTxApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'KoRTx Digital Dollars',
      theme: ThemeData(
        brightness: Brightness.dark,
        scaffoldBackgroundColor: const Color(0xFF262626),
        textTheme: GoogleFonts.cinzelTextTheme(Theme.of(context).textTheme),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFFD4AF37),
          secondary: Color(0xFF0047AB),
        ),
      ),
      home: Scaffold(
        appBar: AppBar(title: const Text('PROJECT MAYHEM HUB'), centerTitle: true),
        body: const Center(
          child: Text('DIGITAL DOLLARS: ONLINE', 
            style: TextStyle(color: Color(0xFFD4AF37), fontSize: 24, fontWeight: FontWeight.bold)
          ),
        ),
      ),
    );
  }
}
